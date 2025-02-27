import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { prisma } from '../app/common/services/database.service'

const SECRET_KEY = process.env.JWT_SECRET || 'secret'

export const resolvers = {
    Query: {
        me: async (_: any, __: any, context: any) => {
            if (!context.user) throw new GraphQLError('Unauthorized')
            return prisma.user.findUnique({ where: { id: context.user.id } })
        },
        messages: async (
            _: any,
            { receiverId }: { receiverId: string },
            context: any
        ) => {
            if (!context.user) throw new GraphQLError('Unauthorized')
            return prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: context.user.id, receiverId },
                        { senderId: receiverId, receiverId: context.user.id },
                    ],
                },
                orderBy: { createdAt: 'asc' },
            })
        },
    },
    Mutation: {
        register: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            })
            if (existingUser) throw new GraphQLError('Email already registered')

            const hashedPassword = await bcrypt.hash(password, 10)
            return prisma.user.create({
                data: { email, password: hashedPassword },
            })
        },
        login: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) throw new GraphQLError('Invalid credentials')

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) throw new GraphQLError('Invalid credentials')

            return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '7d',
            })
        },
        sendMessage: async (
            _: any,
            { receiverId, content }: { receiverId: string; content: string },
            context: any
        ) => {
            if (!context.user) throw new GraphQLError('Unauthorized')

            return prisma.message.create({
                data: { senderId: context.user.id, receiverId, content },
            })
        },
    },
    Message: {
        sender: (parent: any) =>
            prisma.user.findUnique({ where: { id: parent.senderId } }),
        receiver: (parent: any) =>
            prisma.user.findUnique({ where: { id: parent.receiverId } }),
    },
}
