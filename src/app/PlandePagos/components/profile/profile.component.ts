import { Component, OnInit } from '@angular/core';
import { SignupData } from '../../../shared/interfaces/signupdata';
import { ActivatedRoute } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service/profile-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userProfile: SignupData | undefined;
    isEditing = false;
    defaultProfileImage = 'https://cdn.discordapp.com/attachments/1149190528756363337/1172571557047050351/1361728.png?ex=6560cd5c&is=654e585c&hm=fa1abee9a3e82d0c8e496c5ee66fa98810df518fd4691e76663d0a1a3bcf6ebe&';
    defaultDireccion = 'Direccion sin especificar';

    constructor(
        private profileService: ProfileServiceService,
        private route: ActivatedRoute
    ) {}

    toggleEdit(): void {
        this.isEditing = !this.isEditing;
    }

    ngOnInit(): void {
        const studentId = this.route.snapshot.params['studentId'];

        if (studentId !== null) {
            this.profileService.getStudentProfileById(studentId).subscribe(
                (student: SignupData) => {
                    this.userProfile = {
                        ...student,
                        profileImage: student.profileImage || this.defaultProfileImage,
                        direccion: student.direccion || this.defaultDireccion
                    };
                },
                (error) => {
                    console.error('Error al obtener el perfil del estudiante:', error);
                }
            );
        } else {
            console.error('studentId es nulo. No se puede obtener el perfil del estudiante.');
        }
    }

    saveProfile(): void {
        if (this.userProfile) {
            this.profileService.updateStudentProfile(
                this.userProfile.id.toString(),
                this.userProfile
            ).subscribe(
                () => {
                    console.log('Perfil actualizado correctamente');
                    this.isEditing = false;
                },
                (error) => {
                    console.error('Error al actualizar el perfil:', error);
                }
            );
        } else {
            console.error('El perfil no está definido. No se puede guardar.');
        }
    }

    cancelEdit(): void {
        this.isEditing = false;
    }
}
