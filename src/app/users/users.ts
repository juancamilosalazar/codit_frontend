import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user';
import { AuthService } from '../services/auth';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  users$: Observable<User[]> | null = null;
  errorMsg = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.users$ = this.userService.getUsers().pipe(
      catchError(err => {
        this.errorMsg = 'Error al cargar los usuarios. Asegúrate de que el backend FastAPI esté corriendo en http://localhost:8000';
        return of([]);
      })
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
