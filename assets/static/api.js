let empresas;
let produtos;

function init() {
    fetch("./assets/json/empresas_participantes.json")
    .then(data => data.json())
    .then(data => {
        empresas = data;
        document.getElementById("search_button_empresa").disabled = false;
        document.getElementById("search_input_empresa").addEventListener("keyup", (event) => {
            if(event.code === 'Enter') doSearchCompany();
            if(event.code === "Escape") closeModal();
        });
        console.info("informações de empresas carregado");
    });

    fetch("./assets/json/produtos_participantes.json")
    .then(data => data.json())
    .then(data => {
        produtos = data;
        document.getElementById("search_button_produto").disabled = false;
        document.getElementById("search_input_produto").addEventListener("keyup", (event) => {
            if(event.code === 'Enter') doSearchProduct();
            if(event.code === "Escape") closeModal();
        });
        console.info("informações dos produtos carregado");
    });
}

function doSearchCompany() {
    let input = document.getElementById("search_input_empresa");
    let cnpj_number = document.getElementById("result_cnpj_number");
    let cnpj_name = document.getElementById("result_cnpj_name");
    let table_empresa = document.getElementById("item_result_cnpj");
    cnpj_number.textContent = "";
    cnpj_name.textContent = "";
    table_empresa.style.display = 'none';

    if(input.value.length === 0) showModal();
    
    empresas.find((value, index) => {
        if(value.cnpj === input.value.trim() || value.cnpj.substring(0,value.cnpj.length - 8) === input.value.trim()){
            closeModal();
            cnpj_number.textContent = value.cnpj;
            cnpj_name.textContent = value.nome;
            table_empresa.style.display = 'block';
        };
    });

    if(cnpj_number.textContent.length === 0) showModal();
}

function doSearchProduct() {
    let input = document.getElementById("search_input_produto");
    let produto_sku = document.getElementById("result_product_sku");
    let produto_descricao = document.getElementById("result_product_description");
    let table_produto = document.getElementById("item_result_produto");
    produto_sku.textContent = "";
    produto_descricao.textContent = "";
    table_produto.style.display = 'none';

    if(input.value.length === 0) showModal();
    
    produtos.find((value, index) => {
        if(value.sku === input.value.trim() || value.sku.substring(0,value.sku.length - 3) === input.value.trim()){
            closeModal();
            produto_sku.textContent = value.sku;
            produto_descricao.textContent = value.descricao;
            table_produto.style.display = 'block';
        };
    });

    if(produto_sku.textContent.length === 0) showModal();
}

function closeModal() {
    document.getElementById("modal").style.display = 'none';
}

function showModal() {
    document.getElementById("modal").style.display = 'block';
}

init();