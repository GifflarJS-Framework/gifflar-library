<div align="center">
    <img src="https://i.imgur.com/mwbuYqE.png" alt="gifflar banner"/>
</div>

[![Node.js CI](https://github.com/GifflarJS-Framework/gifflar-library/actions/workflows/tests.yml/badge.svg)](https://github.com/GifflarJS-Framework/gifflar-library/actions/workflows/tests.yml)

# Gifflar.js

Um framework para gerar, compilar e implementar contratos inteligentes em tempo de execução.

## Status de projeto

**Em desenvolvimento**

## Propriedades suportadas

| Propriedade             |      Suporta       | Exemplo                                               |
| ----------------------- | :----------------: | ----------------------------------------------------- |
| Declaração de Variáveis | :heavy_check_mark: | `string name;`<br/> `string name = "Bob";`            |
| Atribuição              | :heavy_check_mark: | `name = "Bob"`<br/> `name = _name`<br/> `val++`       |
| Estruturas              |        :x:         | `struct Person {string name;}`                        |
| Modificadores           |        :x:         | `modifier onlyOwner(){`<br/>`[...];`<br/>`_;`<br/>`}` |
| Criação de eventos      | :heavy_check_mark: | `event myEvent(string name);`                         |
| Chamada de eventos      | :heavy_check_mark: | `emit myEvent(_name);`                                |
| Criação de Funções      | :heavy_check_mark: | `function myFuntion() public {...}`                   |
| Criação de Construtor   | :heavy_check_mark: | `function constructor() public {...}`                 |
| Estrutura IF/Else       | :heavy_check_mark: | `if(count == 1){...}else{...}`                        |
| IFs aninhados           | :heavy_check_mark: | `if(){if(){...}}`                                     |
| Loops For               | :heavy_check_mark: | `for(i=0;i<count;i++){...}`                           |
| Loops While             |        :x:         | `while(a != b){...}`                                  |
| Loops Do/While          |        :x:         | `do{...}while(a != b);`                               |
| Herança                 |        :x:         | `contract Dog is Animal{...}`                         |
