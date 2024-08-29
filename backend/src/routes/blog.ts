import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@himanshukrabc/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    id:string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  console.log(c.req.header("authorization"));
  try {
    const token = header.split(" ")[1];
    const resp = await verify(token, c.env.JWT_SECRET);
    if (resp) {
      c.set("id",String(resp.id));
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (err) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const authorId = Number(c.get("id"));
  const {success,error} = createBlogInput.safeParse(body);
    if(!success){
      console.log(body) 
      console.log(error) 
        c.status(411);
        return c.json({error:"Inputs not correct"});
    }const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({ blog_id: blog.id });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
      c.status(411);
      return c.json({error:"Inputs not correct"});
  }
  const blog = await prisma.post.update({
    where: {
        id:body.id
    },
    data: {
      title: body.title,
      content: body.content
    },
  });
  return c.json({ blog_id: blog.id });
});

blogRouter.get("/get/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const id = c.req.param('id');
        const blog = await prisma.post.findUnique({
            where: {
                id:Number(id)
            },
            select:{
              content:true,
              title:true,
              id:true,
              author:{
                select:{
                  name:true
                }
              }
            }
        });
        return c.json(blog);
    }
    catch(err){
        console.log(err);
        c.status(411);
        return c.json({error:"Error hile ffetching"});
    }
});

//Todo: add pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.post.findMany({
          select:{
            content:true,
            title:true,
            id:true,
            author:{
              select:{
                name:true
              }
            }
          }
        });
        return c.json(blog);
    }
    catch(err){
        c.status(411);
        return c.json({error:"Error hile ffetching"});
    }
});