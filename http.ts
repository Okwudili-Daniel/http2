import http, { IncomingMessage, ServerResponse } from "http"

interface iData {
    id: number
    name: string
    phone: number
    stack: string
}
interface iMessage {
    message: string
    successs: boolean
    data: null | object | {}[]
}


const port = 3000

const set08: iData[] = [
    {
        id: 1,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 1,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 1,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 1,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
]

const Server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
   res.setHeader("Content-Type", "Application/Json")
    
   const {method, url} = req

   let status: number = 404

   let response: iMessage = {
    message: "failed",
    successs: false,
    data: null
   }

   const container: any = []
   req.on("data", (chunk: any) =>{
    container.push(chunk);
   }).on("end", () =>{

    // Get method 
    if (url === "/" && method === "GET"){
        status = 200;
        response.message = "All set08 data gotten";
        response.successs = true;
        response.data = set08;
        res.write(JSON.stringify({
            response, status
        }));
        res.end()
    }

    // post method
    if (url === "/" && method === "POST"){
        status = 201;
        const body = JSON.parse(container);
        set08.push(body);
        response.message = ""
    }
   })
})

Server.listen(port, () =>{
    console.log("Done");
})