import http, { IncomingMessage, ServerResponse } from "http"
import event from "events"

const port: number = 2000




interface iData {
    id: number
    name: string
    phone: number
    stack: string
}
interface iMessage {
    message: string
    success: boolean
    data: null | object | {}[]
}



const set08: iData[] = [
    {
        id: 1,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 2,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 3,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
    {
        id: 4,
        name: "joan",
        phone: 803552825,
        stack: "Full-Stack"
    },
]

const Server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
   res.setHeader("Content-Type", "application/json")
    
   const {method, url} = req

   let status: number = 404

   let response: iMessage = {
    message: "failed",
    success: false,
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
        response.success = true;
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
        response.message = "Successfully added";
        response.success = true
        response.data = set08;
        res.write(JSON.stringify({response, status}))

        res.end()
    }
   })
})

Server.listen(port, () =>{
    console.log("Done");
})