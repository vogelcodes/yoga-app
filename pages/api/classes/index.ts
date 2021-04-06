// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query as q } from 'faunadb'
import { fauna as faunaClient } from '../../../services/fauna'

import { NextApiRequest, NextApiResponse } from "next"


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const aula = req.body
        const newClass = await faunaClient.query(q.Create(q.Collection("aulas"), {
            data: {
              title: aula.title,
              instructor: aula.instructor,
              date: aula.date,
              type: aula.type,
              duration: aula.duration,              
              createdAt: q.Now(),
              updatedAt: q.Now(),
            },}
            ), )
        res.json({ newClass })

      } else {
         const classList = await faunaClient.query(
            q.Get((q.Documents(q.Collection('aulas'))
          )))
        
        res.status(200).json({ aulas: classList })
      }
    }
  