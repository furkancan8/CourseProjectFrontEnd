import { Pipe, PipeTransform } from '@angular/core';
import { VideoDetails } from '../models/Course/videoDetails';

@Pipe({
  name: 'denemePipe'
})
export class DenemePipePipe implements PipeTransform {

  transform(value: VideoDetails[]): VideoDetails[] {
    return value.sort((a,b)=>a.videoLine-b.videoLine);

  }

}
