// src/types/interfaces.ts

// Tipos Globais para Usuários
export interface User {
  id: number;            // ID único do usuário
  name: string;          // Nome completo
  email: string;         // Email do usuário
  password: string;      // Senha (criptografada)
  role: 'aluno' | 'professor' | 'admin'; // Papel do usuário
  created_at: string;    // Data de criação da conta
}

// Tipos Globais para Cursos
export interface Course {
  id: number;            // ID único do curso
  image_url: string;     // URL da imagem do curso
  title: string;         // Título do curso
  description: string;   // Descrição do curso
  category: string;      // Categoria do curso (ex.: tecnologia, negócios, arte)
  instructor_id: number; // ID do professor responsável
  instructor_name: string; // Nome do professor
  status: 'ativo' | 'inativo' | 'pendente'; // Status do curso
  created_at: string;    // Data de criação
}

// Tipos Globais para Materiais Didáticos
export interface Material {
  id: number;            // ID único do material
  course_id: number;     // ID do curso ao qual o material pertence
  name: string;          // Nome do material
  url: string;           // URL ou caminho do arquivo
  type: 'video' | 'pdf' | 'slide' | 'quiz'; // Tipo do material
  uploaded_at: string;   // Data de upload
}

// Tipos Globais para Progresso do Aluno
export interface Progress {
  user_id: number;       // ID do aluno
  course_id: number;     // ID do curso
  module_id?: number;    // ID do módulo concluído (opcional)
  percentage: number;    // Porcentagem de conclusão
  updated_at: string;    // Última atualização
}

// Tipos Globais para Feedbacks
export interface Feedback {
  id: number;            // ID único do feedback
  user_id: number;       // ID do usuário que enviou o feedback
  course_id?: number;    // ID do curso relacionado (opcional)
  message: string;       // Conteúdo da mensagem
  sentiment: 'positivo' | 'negativo' | 'neutro'; // Sentimento detectado pela IA
  created_at: string;    // Data de envio
  category: string;
  content: string;
}

// Tipos Globais para Certificados
export interface Certificate {
  id: number;            // ID único do certificado
  user_id: number;       // ID do aluno que concluiu o curso
  course_id: number;     // ID do curso concluído
  issue_date: string;    // Data de emissão do certificado
  file_url: string;      // URL do arquivo PDF do certificado
  image_url: string;     // URL da imagem do certificado
  courseTitle: string;   // Título do curso (para exibição)
  name: string;          // Nome do certificado (ou aluno, conforme uso)
}

// Tipos Globais para Notificações
export interface Notification {
  id: number;            // ID única da notificação
  user_id?: number;      // ID do destinatário (opcional para notificações globais)
  message: string;       // Conteúdo da notificação
  read_status: boolean;  // Status de leitura
  created_at: string;    // Data de criação
}

// Tipos Globais para Configurações
export interface Setting {
  key: string;           // Chave da configuração
  value: string;         // Valor da configuração
  updated_at: string;    // Última atualização
}

// Tipos Globais para Modelos de IA
export interface AIModel {
  id: number;                        // ID única do modelo
  name: string;                      // Nome do modelo
  endpoint: string;                  // Endpoint da API do modelo
  parameters: Record<string, any>;   // Parâmetros configuráveis do modelo
  status: 'ativo' | 'inativo';        // Status do modelo
}

// Tipos Globais para Fóruns
export interface ForumPost {
  id: number;           // ID única da postagem
  user_id: number;      // ID do autor da postagem
  course_id: number;    // ID do curso relacionado
  content: string;      // Conteúdo da postagem
  created_at: string;   // Data de criação
  author: string;       // Nome do autor (obtido de uma junção ou via transformação)
}

// Tipos Globais para Quizzes
export interface QuizQuestion {
  id: number;                                   // ID única da questão
  text: string;                                 // Texto da questão
  options: { id: number; text: string }[];      // Opções de resposta 
  correct_option: number;                       // Índice da resposta correta
}

export interface Quiz {
  id: number;              // ID única do quiz
  course_id: number;       // ID do curso relacionado
  title: string;           // Título do quiz
  questions: QuizQuestion[];// Lista de questões
}

export interface QuizData {
  title: string;
  // Outras propriedades, se necessário
}

// Interface para "Option" (se o quiz for estruturado como objeto para cada opção)
export interface Option {
  id: number;
  text: string;
}

// Tipos Globais para Gamificação
export interface Point {
  id: number;           // ID única da pontuação
  user_id: number;      // ID do aluno
  activity_id: number;  // ID da atividade concluída
  points: number;       // Pontos ganhos
  earned_at: string;    // Data de obtenção dos pontos
}

export interface LeaderboardEntry {
  user_id: number;      // ID do aluno
  name: string;         // Nome do aluno
  total_points: number; // Total de pontos conquistados
}

// Tipos Globais para Mensagens
export interface Message {
  id: number;           // ID única da mensagem
  sender: string;       // Remetente da mensagem
  content: string;      // Conteúdo da mensagem
  created_at?: string;  // Data de criação (opcional)
}

// Tipos Globais para Feedback (segunda definição encontrada – opte por uma das duas)
export interface SimpleFeedback {
  id: number;
  category: string;
  content: string;
}

// Tipos Globais para Alunos (para gamificação ou desempenho)
export interface Student {
  id: number;
  name: string;
  progress: number;
}

// Tipos Globais para Notificações (segunda definição – opte por uma única)
export interface SimpleNotification {
  id: number;
  message: string;
  created_at: string;
}

// Tipos Globais para Atividades (gamificação)
export interface Activity {
  id: number;
  name: string;
  points: string; // Se for numérico, considere usar number
}

// Tipos Globais para Recomendações e Respostas de Quiz

export interface Answers {
  id: number;
  [key: number]: number;
  texto: string;
  opcoes: { id: number; texto: string }[];
}

export interface Recommendation {
  id: number;
  title: string;
  user_id: number;
  activity_id: number;
  answers: Answers;
}