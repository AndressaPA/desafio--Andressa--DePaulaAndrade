export class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50,
      };
  
      this.formasPagamento = {
        debito: 0,
        credito: 0.03,
        dinheiro: -0.05,
      };
    }
  
    calcularValorDaCompra(metodoDePagamento, itens) {
      if (!this.formasPagamento.hasOwnProperty(metodoDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      const itensPedido = {};
      let valorTotal = 0;
  
      for (const item of itens) {
        const [codigo, quantidade] = item.split(",");
        
        if (!this.cardapio.hasOwnProperty(codigo)) {
          return "Item inválido!";
        }
  
        if (!itensPedido[codigo]) {
          itensPedido[codigo] = 0;
        }
  
        itensPedido[codigo] += parseInt(quantidade);
      }
  
      for (const codigo in itensPedido) {
        if (codigo.includes("extra")) {
          const itemPrincipal = codigo.split("-")[0];
          if (!itensPedido[itemPrincipal]) {
            return "Item extra não pode ser pedido sem o principal";
          }
        } else if (codigo.includes("combo")) {
          const comboItens = codigo.split(",");
          for (const comboItem of comboItens) {
            valorTotal += this.cardapio[comboItem] * itensPedido[codigo];
          }
        } else {
          valorTotal += this.cardapio[codigo] * itensPedido[codigo];
        }
      }
  
      const descontoOuAcrescimo = this.formasPagamento[metodoDePagamento];
      valorTotal += valorTotal * descontoOuAcrescimo;
  
      if (valorTotal <= 0) {
        return "Quantidade inválida!";
      }
  
      return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
  }
  