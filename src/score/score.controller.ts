import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ScoreService } from './score.service';



@Controller('score')
export class ScoreController {
    constructor(private scoreService: ScoreService) { }

    @Delete('delete/:resId')
    deletWholeResume(@Param('resId', ParseIntPipe) resId: number) {
      console.log(resId);
      return this.scoreService.deleteByResume(resId);
    }
}
