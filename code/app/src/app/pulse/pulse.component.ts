import { Component, OnInit } from '@angular/core';
import {StreamService} from '../stream.service';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html'
})
export class PulseComponent{
  constructor(public stream: StreamService) { }
}
