<%@page import="model.AulaDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <title>Prova 1</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
<%
    AulaDto dto = (AulaDto) session.getAttribute("dto");
    Boolean hasErrorObj = (Boolean) session.getAttribute("hasError");
    boolean hasError = hasErrorObj != null && hasErrorObj;

 
    String id = dto != null ? dto.id : "";
    String codDisciplina = dto != null ? dto.codDisciplina : "";
    String assunto = dto != null ? dto.assunto : "";
    String duracao = dto != null ? dto.duracao : "";
    String data = dto != null ? dto.data : "";
    String horario = dto != null ? dto.horario : "";
%>

<header class="container-cabecalho">
  <h3>Editando: aula de <span id="nome-disciplina"><%= assunto %></span></h3>
</header>
<nav class="container-nav">
  <div class="btn-nav" onclick="enviarEdit()">ENVIAR</div>
  <div class="btn-nav" onclick="cancelarNovaAula()">CANCELAR</div>
</nav>

<div class="container-geral">
    <div class="container-aula-edit" id="msg-id" <% if (!hasError) { %> hidden="hidden" <% } %>>
        <div class="texto">
            Erro ao tentar registrar dados
        </div>
    </div>
    <div class="container-aula-edit">
        <div id="id" hidden="hidden"><%= id %></div>
        <div class="container-linha1">
            <div class="info">Data: <input id="data-id" type="date" class="inp-data" value="<%= data %>"></div>
            <div class="info">Horário: <input id="hora-id" type="text" class="inp-hora" value="<%= horario %>"></div>
            <div class="info">Duração: <input id="dur-id" type="number" class="inp-dur" value="<%= duracao %>"></div>
        </div>
        <div class="container-linha2">
            <div class="info">Disciplina:
                <select name="" id="disc-id" class="inp-disc">
                    <option value="1" <%= codDisciplina.equals("1") ? "selected" : "" %>>CÁLCULO</option>
                    <option value="2" <%= codDisciplina.equals("2") ? "selected" : "" %>>LÓGICA</option>
                    <option value="3" <%= codDisciplina.equals("3") ? "selected" : "" %>>GEOMETRIA</option>
                    <option value="4" <%= codDisciplina.equals("4") ? "selected" : "" %>>FÍSICA</option>
                    <option value="5" <%= codDisciplina.equals("5") ? "selected" : "" %>>COMPILADORES</option>
                </select>
            </div>
            <div class="info">Assunto: <input id="ass-id" type="text" class="inp-ass" value="<%= assunto %>"></div>
        </div>
    </div>
</div>

<script src="script.js"></script>
<script type="text/javascript">
    function selecionar(cod) {
        let select = document.getElementById('disc-id');
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == cod) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    selecionar(<%= codDisciplina %>);
</script>

</body>

</html>
