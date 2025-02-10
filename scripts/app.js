"use strict";

import avaliacoes from "./avaliacoes.js";

let avaliacaoAtual = 0;

// Função auxiliar para selecionar elementos
const selecionar = seletor => document.querySelector(seletor);

// Elementos da avaliação
const imagem = selecionar(".review__image");
const nome = selecionar(".review__name");
const idade = selecionar(".review__age");
const origem = selecionar(".review__location");
const nota = selecionar(".review__score");
const notaEstrelas = selecionar(".review__stars");
const avaliacaoTexto = selecionar(".review__text");

// Botões de navegação
const botaoProximaAvaliacao = selecionar(".review__button--next");
const botaoAvaliacaoAnterior = selecionar(".review__button--prev");

// Função para exibir a avaliação do hóspede
function mostrarAvaliacao(hospede) {
    const avaliacao = avaliacoes[hospede];
    imagem.src = avaliacao.imagem;
    nome.textContent = avaliacao.nome;
    idade.textContent = `${avaliacao.idade} anos`;
    origem.textContent = avaliacao.origem;
    nota.textContent = parseFloat(avaliacao.nota).toFixed(1);
    notaEstrelas.textContent = converterNotasParaEstrelas(avaliacao.nota);
    avaliacaoTexto.textContent = `“${avaliacao.avaliacao}”`;
}

// Função para converter nota em estrelas
function converterNotasParaEstrelas(nota) {
    return "★".repeat(nota) + "☆".repeat(5 - nota);
}

// Função para navegar entre avaliações
function mudarAvaliacao(direcao) {
    avaliacaoAtual += direcao;

    // Se passar do último, volta ao primeiro
    if (avaliacaoAtual > avaliacoes.length - 1) {
        avaliacaoAtual = 0;
    }

    // Se for menor que o primeiro, vai para o último
    if (avaliacaoAtual < 0) {
        avaliacaoAtual = avaliacoes.length - 1;
    }

    mostrarAvaliacao(avaliacaoAtual);
};

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    mostrarAvaliacao(avaliacaoAtual);
});

// Adiciona evento aos botões de navegação
botaoProximaAvaliacao.addEventListener("click", () => mudarAvaliacao(1));
botaoAvaliacaoAnterior.addEventListener("click", () => mudarAvaliacao(-1));