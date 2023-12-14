import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link';
import prisma from "@/prisma/client";
const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
      <div>
        <table className='border-separate border-spacing-2 border border-slate-400 hover:border-spacing-10 mb-5'>
        <thead>
          <tr>
            <th className='border border-slate-300'>Id</th>
            <th className='border border-slate-300'>Title</th>
            <th className='border border-slate-300'>Description</th>
            <th className='border border-slate-300'>Status</th>
            <th className='border border-slate-300'>CreatedAt</th>
            <th className='border border-slate-300'>UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
        {issues.map(issue => (<tr key={issue.id}>
                                <td>{issue.id}</td>
                                <td>{issue.title}</td>
                                <td>{issue.description}</td>
                                <td>{issue.status}</td>
                                <td>{issue.createdAt.toISOString()}</td>
                                <td>{issue.updatedAt.toISOString()}</td>
                              </tr>
                              ))}
        </tbody>
      </table>
      <Button><Link href='/issues/new'>New issue</Link></Button>
    </div>
  )
}

export default Issues