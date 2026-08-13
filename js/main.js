/* ============================================================
   Bella Casa Verde Floricultura — interações do site
   - Menu mobile
   - Navegação ativa por rolagem
   - Máscara de telefone
   - Validação e envio do formulário via WhatsApp
   - Galeria com lightbox
   ============================================================ */

(function () {
  "use strict";

  /* Número de WhatsApp da empresa */
  var WHATSAPP_NUMBER = "556336027339";

  /* ============ Menu mobile ============ */
  var nav = document.getElementById("menu");
  var navToggle = document.getElementById("navToggle");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha o menu ao clicar em um link
    var links = nav.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    // Fecha com a tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ============ Menu ativo conforme rolagem ============ */
  var navLinks = document.querySelectorAll('.nav__list a');
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#" && id.length > 1 && document.querySelector(id)) {
      sections.push({ link: link, el: document.querySelector(id) });
    }
  });

  function setActiveLink() {
    var scrollPos = window.scrollY + 160;
    var currentId = "topo";
    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollPos) {
        currentId = item.el.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      var match = href === "#" + currentId;
      link.classList.toggle("active", match);
    });
  }

  window.addEventListener("scroll", function () {
    if (navLinks.length) {
      setActiveLink();
    }
  });

  if (navLinks.length) {
    setActiveLink();
  }

  /* ============ Máscara de telefone (padrão brasileiro) ============ */
  var telInput = document.getElementById("telefone");

  function mascaraTelefone(value) {
    value = value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/(\d{0,2})/, "($1");
    }
    return value;
  }

  if (telInput) {
    telInput.addEventListener("input", function () {
      telInput.value = mascaraTelefone(telInput.value);
      clearError(telInput);
    });
  }

  /* ============ Validação do formulário ============ */
  var form = document.getElementById("orcamentoForm");

  function setError(input, message) {
    var field = input.closest(".form__field");
    var errorEl = field ? field.querySelector(".form__error") : null;
    if (field) field.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
    if (input && input.setAttribute) input.setAttribute("aria-invalid", "true");
    return false;
  }

  function clearError(input) {
    var field = input.closest(".form__field");
    var errorEl = field ? field.querySelector(".form__error") : null;
    if (field) field.classList.remove("is-invalid");
    if (errorEl) errorEl.textContent = "";
    if (input && input.removeAttribute) input.removeAttribute("aria-invalid");
  }

  var telefoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validarCampo(input) {
    var value = input.value.trim();
    var name = input.name;
    var ok = true;

    if (name === "nome") {
      if (value.length < 2) {
        setError(input, "Informe seu nome (mínimo de 2 caracteres).");
        ok = false;
      } else {
        clearError(input);
      }
    } else if (name === "telefone") {
      if (!telefoneRegex.test(value)) {
        setError(input, "Informe um telefone válido com DDD.");
        ok = false;
      } else {
        clearError(input);
      }
    } else if (name === "email") {
      if (value.length > 0 && !emailRegex.test(value)) {
        setError(input, "Informe um e-mail válido (opcional).");
        ok = false;
      } else {
        clearError(input);
      }
    } else if (name === "produto") {
      if (!value) {
        setError(input, "Selecione o produto ou serviço de interesse.");
        ok = false;
      } else {
        clearError(input);
      }
    } else if (name === "mensagem") {
      if (!value) {
        setError(input, "Escreva uma mensagem para seu orçamento.");
        ok = false;
      } else {
        clearError(input);
      }
    }
    return ok;
  }

  // Validação em tempo real ao sair do campo
  if (form) {
    var fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (!input.value.trim() && input.name !== "email") {
          return; // deixa a validação acontecer no submit para campo vazio
        }
        validarCampo(input);
      });
      input.addEventListener("input", function () {
        if (input.closest(".form__field").classList.contains("is-invalid")) {
          validarCampo(input);
        }
      });
    });
  }

  // Trata o caso de campo vazio no blur: limpa o erro se preencher
  fields.forEach(function (input) {
    if (input.name === "email") return;
    input.addEventListener("input", function () {
      if (input.value.trim()) {
        validarCampo(input);
      } else {
        clearError(input);
      }
    });
  });

  function obterMensagemWhatsApp() {
    var nome = document.getElementById("nome").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var email = document.getElementById("email").value.trim();
    var produto = document.getElementById("produto").value;
    var mensagem = document.getElementById("mensagem").value.trim();

    var linhas = [
      "Olá, Bella Casa Verde! 🌿🏡",
      "",
      "Gostaria de solicitar um orçamento. 😊",
      "",
      "👤 Nome: " + nome,
      "📱 Telefone: " + telefone,
      "📧 E-mail: " + (email || "não informado"),
      "",
      "🌱 Produto/Serviço de interesse: " + produto,
      "",
      "💬 Mensagem: " + mensagem,
      "",
      "Aguardo o retorno de vocês. Obrigado! 🙏"
    ];

    return linhas.join("\n");
  }

  var statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var valid = true;
      fields.forEach(function (input) {
        // Valida todos, mas ignora erro de e-mail vazio (é opcional)
        if (input.name === "email" && !input.value.trim()) return;
        if (!validarCampo(input)) {
          valid = false;
        }
      });

      if (!valid) {
        if (statusEl) {
          statusEl.textContent = "Verifique os campos destacados antes de enviar.";
        }
        var firstInvalid = form.querySelector(".form__field.is-invalid");
        if (firstInvalid) {
          var firstInput = firstInvalid.querySelector("input, select, textarea");
          if (firstInput) firstInput.focus();
        }
        return;
      }

      var mensagem = obterMensagemWhatsApp();
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(mensagem);

      if (statusEl) {
        statusEl.textContent = "Sua solicitação será encaminhada para nosso atendimento pelo WhatsApp.";
        statusEl.classList.add("is-success");
      }

      window.open(url, "_blank", "noopener");
    });
  }

  /* ============ Galeria com lightbox ============ */
  var galeriaItems = document.querySelectorAll(".galeria__item");
  var lightbox = document.getElementById("lightbox");
  var lightboxMedia = document.getElementById("lightboxMedia");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(item) {
    var caption = item.getAttribute("data-caption") || "Bella Casa Verde";
    if (lightboxMedia) {
      var img = item.querySelector(".galeria__media img");
      lightboxMedia.innerHTML = "";
      if (img) {
        var clone = document.createElement("img");
        clone.src = img.src;
        clone.alt = img.alt || caption;
        clone.className = "galeria__lightbox-img";
        lightboxMedia.appendChild(clone);
      } else {
        var media = document.createElement("div");
        media.className = "galeria__placeholder";
        media.style.minHeight = "260px";
        var span = document.createElement("span");
        span.textContent = "[ " + caption + " ]";
        media.appendChild(span);
        lightboxMedia.appendChild(media);
      }
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
    if (lightbox) {
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      if (lightboxClose) lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
    if (lightboxMedia) lightboxMedia.innerHTML = "";
  }

  galeriaItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLightbox(item);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
