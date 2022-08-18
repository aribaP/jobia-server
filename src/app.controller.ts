import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController {
    @Get()
    
    getCandidate(){
        return "I am a candidate";
    }
}