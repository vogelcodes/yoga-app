import { getSession } from "next-auth/client"
import { query as q } from 'faunadb'
import { fauna as faunaClient } from '../../../services/fauna'
import { api, zoomAPI } from '../../../services/api';


import { NextApiRequest, NextApiResponse } from "next"


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    const query: any = await faunaClient.query(q.Call(q.Function("get_all_users")))
    const users: [] = query.data;         
    const userList = users.map((user: any) => {
        return {
          id: user.ref.id,
          name: user.data.name,
          image: user.data.image,
          email: user.data.email || "-",
          role: user.data.role,
        };
      });


    res.status(200).json(userList);
  } 
    else {
      // Not Signed in
      res.status(401).json({error: "Not signed in"})
    }
    res.end()

  
     

}