<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Container principal para links e redes sociais -->
      <div class="content-wrapper">
        <div class="links">
          <h4>Links Úteis</h4>
          <ul>
            <li><router-link to="/about">Sobre Nós</router-link></li>
            <li><router-link to="/contact">Contato</router-link></li>
            <li><router-link to="/privacy-policy">Política de Privacidade</router-link></li>
            <li><router-link to="/terms-of-service">Termos de Uso</router-link></li>
          </ul>
        </div>

        <div class="social-media">
          <h4>Siga-nos</h4>
          <ul>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook"></i> Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="copyright">
        <p>Plataforma dyEAD &copy; {{ currentYear }} by marconData. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  background-color: #35495e;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: -64px; /* altura do rodapé */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.content-wrapper {
  display: flex;
  justify-content: center; /* Centraliza o conteúdo */
  gap: 200px; /* Espaço entre colunas */
  flex-wrap: wrap; /* Quebra para linha em telas pequenas */
  margin-left: 280px; /* Desloca o conteúdo para a direita */
}

.links,
.social-media {
  flex: 1; /* Ocupa espaço igual */
  min-width: 200px; /* Largura mínima para evitar esmagamento */
}

.links ul,
.social-media ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.links li,
.social-media li {
  margin-bottom: 10px;
}

.links a,
.social-media a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.links h4, .social-media h4 {
  text-align: left;
  margin-bottom: 10px;
}

.copyright {
  text-align: center;
  font-size: 0.9rem;
  color: #c7d1d9;
  margin-top: 20px;
}

/* Responsividade */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 20px;
  }
}
</style>