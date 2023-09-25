import http, { IncomingMessage, ServerResponse } from "http"

const port = 2500

interface iMessage {
    message: string,
    sucess: boolean,
    data: null | object | {}[]
}


const Message = [
    {
        id: 1,
        name: "Daniel"
    },
    {
        id: 2,
        name: "Bigi"
    },
    {
        id: 3,
        name: "Tawio"
    },
    {
        id: 4,
        name: "Ndubizi"
    },
    {
        id: 5,
        name: "Daniel"
    },
    {
        id: 6,
        name: "Daniel"
    },
]

const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "application/json")

    const {method, url} = req
    let status = 404

    let response:iMessage= {
        message: "failed",
        sucess: false,
        data:  null
    }

    let container: any = []
    req.on("data", (chunk: any) =>{
        container.push(chunk)

    }).on("end", () =>{

        // get method
        if(url === "/" && method === "GET"){
            status = 200

            response.message = "Successful",
            response.sucess = true,
            response.data = Message
            res.write(JSON.stringify({status, response}))

            res.end()
        }

        // post method
        if(url === "/" && method === "POST"){
            status = 401;

            const body = JSON.parse(container)
            Message.push(body)
            
            response.message = "Successfully added"
            response.sucess = true
            response.data = Message
            res.write(JSON.stringify({status, response}))

            res.end()
        }

    })
})


server.listen(port, () =>{
    console.log("Done");
    
})