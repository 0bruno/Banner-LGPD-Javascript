let lgpdUrl = 'https://jsonplaceholder.typicode.com/posts';
let lgpdHtml = `
<div class="lgpd">
      <div class="lgpd--left">
        nós utilizamos cookie para melhorar sua experiência como usuário.<br />
        Para conferir detalhadamente todos os cookies utilizados, leia nossa
        <a href="">política de privacidade</a>
      </div>
      <div class="lgpd--right">
        <button>OK</button>
      </div>
    </div>
    <link rel="stylesheet" href="lgpd.css" />
    `;
//pegando dados do localStorage
const lsContent = localStorage.getItem('lgpd');
//verificar se tem conteudo
if (!lsContent) {
  //exibindo a barra, adicionando ao conteudo html
  document.body.innerHTML += lgpdHtml;

  let lgpdArea = document.querySelector('.lgpd');
  //procurando button dentro de lgpdArea
  let lgpdButton = lgpdArea.querySelector('button');
  //adicionando click
  lgpdButton.addEventListener('click', async () => {
    //removendo codigo da tela
    lgpdArea.remove();

    //salvando dados do visitante como pede a lei.
    //fazendo requisição
    //recebo alguma informacao do backend e salvo isso aqui identificando quem e o user
    let result = await fetch(lgpdUrl); //gerando codigo unico pro usuario especifico para fim de identificacao
    //recebendo identificacao do usurario
    let json = await result.json();

    //se nao deu erro salvo meu localStorage
    if (json.error != '') {
      let id = json.id; //salvo variavel recebida do servidor
      localStorage.setItem('lgpd', id); // salvo variavel no meu localstorage
    }
  });
}
