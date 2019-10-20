import {Component, OnInit} from '@angular/core';
import {Base, ConfigService} from '../../services/config.service';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private config: ConfigService) {
  }

  ngOnInit() {
  }

  public onBaseChange(event: MatButtonToggleChange) {
    this.config.setBase(event.value);
  }
}
