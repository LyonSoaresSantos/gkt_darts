import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { League } from '../league.model';
import { LeagueService } from '../leagues.service';

@Component({
  selector: 'app-league-create',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent implements OnInit, OnDestroy {

  constructor(
    private leagueService: LeagueService,
    private authService: AuthService,
    public route: ActivatedRoute
  ) { }

  league: League;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private leagueId: string;
  private authStatusSub: Subscription;

  onSaveLeague() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.leagueService.addLeague(
        this.form.value.title,
        this.form.value.content,
        this.form.value.type,
        1,
      );
    } else {
      this.leagueService.updateLeague(
        this.leagueId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.type,
        this.form.value.status
      );
    }
    this.form.reset();
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('leagueId')) {
        this.mode = 'edit';
        this.leagueId = paramMap.get('leagueId');
        this.isLoading = true;
        this.leagueService.getLeague(this.leagueId).subscribe((leagueData) => {
          this.isLoading = false;
          this.league = {
            id: leagueData.id,
            title: leagueData.title,
            content: leagueData.content,
            type: leagueData.type,
            status: leagueData.status
          };
          this.form.setValue({
            title: this.league.title,
            content: this.league.content,
            type: this.league.type,
            status: this.league.status
          });
        });
      } else {
        this.mode = 'create';
        this.league = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

}
