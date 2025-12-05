export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    CLUB_ADMIN = "club_admin",
    COACH = "coach"
}
export declare class RegisterDto {
    name?: string;
    email: string;
    phone?: string;
    password: string;
    role: UserRole;
    clubId?: string;
}
