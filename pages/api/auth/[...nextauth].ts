import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'
import { query as q } from 'faunadb'
import { fauna as faunaClient } from '../../../services/fauna'
import { Adapter } from '../../../services/fauna-adapter'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // Providers.Discord({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET
    // }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
    // ...add more providers here
  ],
  // callbacks: {
  //   async signIn(user,account, profile){
  //       const { email, name, image } = user;
  //       try {
          
  //         await faunaClient.query(
  //           q.If(
  //             q.Not(
  //               q.Exists(
  //                 q.Match(
  //                   q.Index('user_by_email'), 
  //                   q.Casefold(email)
  //                   )
  //                   )
  //                   )
  //                   ,
  //                   q.Create(
  //                     q.Collection('users'),
  //                     { data: { email, name, image }}),
  //                     q.Get(
  //                       q.Match(
  //                         q.Index('user_by_email'), 
  //                         q.Casefold(email)
  //                         )
                          
  //                         )
  //                         )
  //                         ) 
  //                         return true
  //                       } catch (error) {
  //                         return false
  //                       }
  //                       }
     
  // },
  adapter: Adapter({faunaClient})

  

  // A database is optional, but required to persist accounts in a database
})