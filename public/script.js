const db = localStorage;

// calcula o total e mostra no index.html
function calculateTotal() {
    let total = 0;

    for (var i = 0; i < localStorage.length; i++) {
        let uniqid = localStorage.key(i);

        if(uniqid != 'uniqid') {
            let obj = JSON.parse(localStorage.getItem(uniqid));
            total += parseFloat(obj.valor.replace(/,/g, '.'));
        }
    }

    total = total.toFixed(2).toString().replace('.', ',');
    document.getElementById('total').innerText = total;
}

// mostra todas as despesas no index.html
function mostrarDespesas() {
    let lista = $('#lista');

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd_mm = dd + '/' + mm;

    for (var i = 0; i < localStorage.length; i++) {
        let uniqid = localStorage.key(i);

        if(uniqid != 'uniqid') {
            let obj = JSON.parse(localStorage.getItem(uniqid));
            let html = '<tr><td>' + obj.nome + '</td><td>' + dd_mm + '</td><td>R$ ' + obj.valor + '</td><td><a onclick="editarDespesa(\'' + uniqid + '\')" href="#">Edit</a></td></tr>';
            lista.append(html);
        }
    }
}

// seta o uniqid para buscar no editar_despesa.html
function editarDespesa(uniqid) {
    db.setItem('uniqid', uniqid);
    window.location.href = "editar_despesa.html";
}

// mostra apenas 1 no editar_despesa.html
function mostrarDespesa() {
    let nome = document.getElementById('desc');
    let valor = document.getElementById('valor');
    let quantidade = document.getElementById('quantidade');

    let uniqid = db.getItem('uniqid');
    let obj = JSON.parse(db.getItem(uniqid));

    nome.value = obj.nome;
    valor.value = obj.valor
    quantidade.value = obj.quantidade;
}

// atualiza despesa no editar_despesa.html
function updateDespesa() {
    let nome = document.getElementById('desc').value;
    let valor = document.getElementById('valor').value;
    let quantidade = document.getElementById('quantidade').value;

    let uniqid = db.getItem('uniqid');
    let obj = JSON.parse(db.getItem(uniqid));

    obj.nome = nome;
    obj.valor = valor;
    obj.quantidade = quantidade;

    // update
    db.setItem(uniqid, JSON.stringify(obj));

    // vai para index
    window.location.href = "index.html";
}

// salva a nova despesa no nova_despesa.html
function save() {
    let nome = document.getElementById('desc').value;
    let valor = document.getElementById('valor').value;
    let quantidade = document.getElementById('quantidade').value;
    let uniqid = Math.random().toString(36).substr(2, 9);

    db.setItem(uniqid, JSON.stringify({ nome, valor, quantidade }));

    window.location.href = "index.html";
}
