// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/client'
import { fauna as faunaClient } from '../../../services/fauna'
import { api, zoomAPI } from '../../../services/api';


import { NextApiRequest, NextApiResponse } from "next"


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    console.log(session.user.role)
    if (req.method === 'POST') {
        const aula = req.body
        const newClass = await faunaClient.query(q.Create(q.Collection("aulas"), {
            data: {
              ...aula,
              inicioAula: q.Time(aula.date),         
              createdAt: q.Now(),
              updatedAt: q.Now(),
            },}
            ), )
        res.json({ newClass })
        
      } else {
        const query: any = await faunaClient.query(q.Call(q.Function("get_week_classes")))
         const classes: [] = query.data;
          
         const classList = classes.map((aula: any) => {
           return {
             id: aula.ref.id,
             title: aula.data.title,
             instructor: aula.data.instructor,
             duration: aula.data.duration,
             date: new Date(aula.data.date),
             createdAt: aula.data.createdAt
           };
         });
        
        res.status(200).json(classList )
      }
    }
      else {
        // Not Signed in
        res.status(401).json({error: "Not signed in"})
      }
      res.end()
    }
    
  