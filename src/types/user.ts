// src/types/user.ts

// Interface principal para representar um usuário
export interface User {
    id: number; // ID única do usuário
    name: string; // Nome completo
    email: string; // Email do usuário
    password: string; // Senha criptografada
    role: UserRole; // Papel do usuário (aluno, professor, admin)
    created_at: string; // Data de criação da conta
    updated_at?: string; // Data da última atualização (opcional)
  }
  
  // Enum para definir os papéis possíveis dos usuários
  export enum UserRole {
    Aluno = 'aluno', // Usuário com perfil de aluno
    Professor = 'professor', // Usuário com perfil de professor
    Admin = 'admin' // Usuário com perfil de administrador
  }
  
  // Interface para representar informações adicionais de um aluno
  export interface Student extends User {
    courses_enrolled: number[]; // IDs dos cursos inscritos pelo aluno
    progress: Record<number, Progress>; // Progresso do aluno por cursoId
  }
  
  // Interface para representar informações adicionais de um professor
  export interface Instructor extends User {
    courses_created: number[]; // IDs dos cursos criados pelo professor
  }
  
  // Interface para representar informações adicionais de um administrador
  export interface AdminUser extends User {
    settings_access: boolean; // Indica se o administrador tem acesso total às configurações
  }
  
  // Interface para representar o progresso do aluno em um curso
  export interface Progress {
    course_id: number; // ID do curso
    module_id?: number; // ID do módulo concluído (opcional)
    percentage: number; // Porcentagem de conclusão
    last_updated: string; // Data da última atualização
  }