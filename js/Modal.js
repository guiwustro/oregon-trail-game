export class Modal {
	static criarModal(tituloModal, mensagemModal) {
		const body = document.querySelector("body");
		const modalDiv = document.createElement("div");
		const modalContent = document.createElement("div");
		const titulo = document.createElement("h3");
		const mensagem = document.createElement("p");
		const button = document.createElement("button");

		titulo.innerText = tituloModal;
		mensagem.innerText = mensagemModal;
		button.innerText = "Fechar";

		modalDiv.classList.add("modal");
		modalContent.classList.add("modal__conteudo");
		titulo.classList.add("modal__titulo");
		mensagem.classList.add("modal__mensagem");
		button.classList.add("modal__button");

		modalDiv.appendChild(modalContent);
		modalContent.append(titulo, mensagem, button);

		body.append(modalDiv);
		const modalButton = document.querySelector(".modal__button");

		return modalButton;
	}

	static removerModal() {
		const modal = document.querySelector(".modal");
		modal.remove();
	}

	static criarEventoModal(tituloModal, mensagemModal) {
		const newModal = Modal.criarModal(tituloModal, mensagemModal);
		console.log("teste");

		newModal.addEventListener("click", Modal.removerModal);
		return;
	}
}
