export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface Challenge {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  difficulty: "Básico" | "Intermediário" | "Avançado";
  description: string;
  starterCode: string;
  hints: string[];
  testCases: TestCase[];
  relatedLesson: string;
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Calculadora de Média",
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    difficulty: "Básico",
    description: `Crie uma função chamada \`calcular_media\` que recebe uma lista de notas (números) e retorna a média aritmética.

**Exemplo:**
- calcular_media([7, 8, 9]) → 8.0
- calcular_media([10, 5, 6, 3]) → 6.0

**Dica:** Use sum() e len().`,
    starterCode: `def calcular_media(notas):
    # Escreva seu código aqui
    pass


# Teste sua solução
print(calcular_media([7, 8, 9]))       # 8.0
print(calcular_media([10, 5, 6, 3]))   # 6.0`,
    hints: [
      "Some todos os valores da lista usando sum(notas)",
      "Divida pelo tamanho da lista usando len(notas)",
      "Retorne o resultado da divisão",
    ],
    testCases: [
      { input: "calcular_media([7, 8, 9])", expected: "8.0", description: "Média simples" },
      { input: "calcular_media([10, 5, 6, 3])", expected: "6.0", description: "4 elementos" },
      { input: "calcular_media([10])", expected: "10.0", description: "Lista com 1 elemento" },
    ],
    relatedLesson: "Funções",
  },
  {
    id: 2,
    title: "Verificar Número Par ou Ímpar",
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    difficulty: "Básico",
    description: `Crie uma função \`par_ou_impar\` que recebe um número inteiro e retorna a string "par" se o número for par, ou "ímpar" se for ímpar.

**Exemplo:**
- par_ou_impar(4) → "par"
- par_ou_impar(7) → "ímpar"
- par_ou_impar(0) → "par"`,
    starterCode: `def par_ou_impar(numero):
    # Escreva seu código aqui
    pass


print(par_ou_impar(4))   # par
print(par_ou_impar(7))   # ímpar
print(par_ou_impar(0))   # par`,
    hints: [
      "Use o operador módulo (%) para verificar o resto da divisão por 2",
      "Se numero % 2 == 0, então é par",
      "Use if/else para retornar a string correta",
    ],
    testCases: [
      { input: "par_ou_impar(4)", expected: '"par"', description: "Número par" },
      { input: "par_ou_impar(7)", expected: '"ímpar"', description: "Número ímpar" },
      { input: "par_ou_impar(0)", expected: '"par"', description: "Zero é par" },
    ],
    relatedLesson: "Operadores e Expressões",
  },
  {
    id: 3,
    title: "Contagem Regressiva",
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    difficulty: "Básico",
    description: `Crie uma função \`contagem_regressiva\` que recebe um número inteiro \`n\` e retorna uma lista com os números de n até 1 em ordem decrescente.

**Exemplo:**
- contagem_regressiva(5) → [5, 4, 3, 2, 1]
- contagem_regressiva(3) → [3, 2, 1]`,
    starterCode: `def contagem_regressiva(n):
    # Escreva seu código aqui
    pass


print(contagem_regressiva(5))  # [5, 4, 3, 2, 1]
print(contagem_regressiva(3))  # [3, 2, 1]`,
    hints: [
      "Use range() com parâmetros: range(n, 0, -1) gera n, n-1, ..., 1",
      "Converta o range para lista com list()",
      "Ou use list comprehension: [x for x in range(n, 0, -1)]",
    ],
    testCases: [
      { input: "contagem_regressiva(5)", expected: "[5, 4, 3, 2, 1]", description: "n=5" },
      { input: "contagem_regressiva(3)", expected: "[3, 2, 1]", description: "n=3" },
      { input: "contagem_regressiva(1)", expected: "[1]", description: "n=1" },
    ],
    relatedLesson: "Loops: for e while",
  },
  {
    id: 4,
    title: "Inverter uma String",
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    difficulty: "Básico",
    description: `Crie uma função \`inverter_string\` que recebe uma string e retorna ela invertida.

**Exemplo:**
- inverter_string("Python") → "nohtyP"
- inverter_string("hello") → "olleh"`,
    starterCode: `def inverter_string(texto):
    # Escreva seu código aqui
    pass


print(inverter_string("Python"))  # nohtyP
print(inverter_string("hello"))   # olleh`,
    hints: [
      "Em Python, strings aceitam fatiamento (slicing)",
      "texto[::-1] retorna a string invertida",
      "O -1 no step do slice indica direção reversa",
    ],
    testCases: [
      { input: 'inverter_string("Python")', expected: '"nohtyP"', description: "Inverter Python" },
      { input: 'inverter_string("hello")', expected: '"olleh"', description: "Inverter hello" },
      { input: 'inverter_string("a")', expected: '"a"', description: "String de 1 char" },
    ],
    relatedLesson: "Listas",
  },
  {
    id: 5,
    title: "Remover Duplicatas",
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    difficulty: "Intermediário",
    description: `Crie uma função \`remover_duplicatas\` que recebe uma lista e retorna uma nova lista com os elementos únicos, mantendo a ordem original de aparição.

**Exemplo:**
- remover_duplicatas([1, 2, 2, 3, 1]) → [1, 2, 3]
- remover_duplicatas(["a", "b", "a"]) → ["a", "b"]`,
    starterCode: `def remover_duplicatas(lista):
    # Escreva seu código aqui
    pass


print(remover_duplicatas([1, 2, 2, 3, 1]))     # [1, 2, 3]
print(remover_duplicatas(["a", "b", "a"]))     # ['a', 'b']`,
    hints: [
      "Use um set para rastrear elementos já vistos",
      "Percorra a lista e adicione ao resultado apenas elementos não vistos",
      "Dica: vistos = set(); resultado = []",
    ],
    testCases: [
      { input: "remover_duplicatas([1, 2, 2, 3, 1])", expected: "[1, 2, 3]", description: "Números duplicados" },
      { input: 'remover_duplicatas(["a", "b", "a"])', expected: '["a", "b"]', description: "Strings duplicadas" },
      { input: "remover_duplicatas([1])", expected: "[1]", description: "Lista sem duplicata" },
    ],
    relatedLesson: "Tuplas e Sets",
  },
  {
    id: 6,
    title: "Contar Ocorrências",
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    difficulty: "Intermediário",
    description: `Crie uma função \`contar_ocorrencias\` que recebe uma lista de palavras e retorna um dicionário com a contagem de cada palavra.

**Exemplo:**
- contar_ocorrencias(["py", "java", "py", "c"]) → {"py": 2, "java": 1, "c": 1}`,
    starterCode: `def contar_ocorrencias(palavras):
    # Escreva seu código aqui
    pass


resultado = contar_ocorrencias(["py", "java", "py", "c"])
print(resultado)  # {'py': 2, 'java': 1, 'c': 1}`,
    hints: [
      "Crie um dicionário vazio: contagem = {}",
      "Para cada palavra, use contagem.get(palavra, 0) para obter o valor atual",
      "Incremente: contagem[palavra] = contagem.get(palavra, 0) + 1",
    ],
    testCases: [
      { input: 'contar_ocorrencias(["py", "java", "py", "c"])', expected: '{"py": 2, "java": 1, "c": 1}', description: "Contagem básica" },
    ],
    relatedLesson: "Dicionários",
  },
  {
    id: 7,
    title: "Fibonacci com Memoização",
    category: "Algoritmos",
    categoryColor: "#F59E0B",
    difficulty: "Intermediário",
    description: `Implemente uma função \`fibonacci\` que retorna o n-ésimo número da sequência de Fibonacci usando **memoização** para otimizar a recursão.

A sequência é: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...

**Exemplo:**
- fibonacci(0) → 0
- fibonacci(10) → 55
- fibonacci(20) → 6765`,
    starterCode: `def fibonacci(n, memo={}):
    # Escreva seu código aqui
    pass


print(fibonacci(0))   # 0
print(fibonacci(10))  # 55
print(fibonacci(20))  # 6765`,
    hints: [
      "Verifique primeiro se n já está no dicionário memo",
      "Defina os casos base: fibonacci(0)=0, fibonacci(1)=1",
      "Armazene o resultado no memo antes de retornar: memo[n] = ...",
    ],
    testCases: [
      { input: "fibonacci(0)", expected: "0", description: "Caso base n=0" },
      { input: "fibonacci(1)", expected: "1", description: "Caso base n=1" },
      { input: "fibonacci(10)", expected: "55", description: "fibonacci(10)" },
      { input: "fibonacci(20)", expected: "6765", description: "fibonacci(20)" },
    ],
    relatedLesson: "Recursão",
  },
  {
    id: 8,
    title: "Busca Binária",
    category: "Algoritmos",
    categoryColor: "#F59E0B",
    difficulty: "Intermediário",
    description: `Implemente a função \`busca_binaria\` que recebe uma lista ordenada e um alvo, retornando o índice do alvo na lista. Retorne -1 se não encontrar.

**Exemplo:**
- busca_binaria([1, 3, 5, 7, 9], 5) → 2
- busca_binaria([1, 3, 5, 7, 9], 4) → -1`,
    starterCode: `def busca_binaria(lista, alvo):
    # Escreva seu código aqui
    pass


print(busca_binaria([1, 3, 5, 7, 9], 5))   # 2
print(busca_binaria([1, 3, 5, 7, 9], 4))   # -1`,
    hints: [
      "Use dois ponteiros: esq = 0 e dir = len(lista) - 1",
      "Calcule o meio: meio = (esq + dir) // 2",
      "Se lista[meio] < alvo, mova esq para meio + 1; se maior, mova dir para meio - 1",
    ],
    testCases: [
      { input: "busca_binaria([1, 3, 5, 7, 9], 5)", expected: "2", description: "Elemento encontrado" },
      { input: "busca_binaria([1, 3, 5, 7, 9], 4)", expected: "-1", description: "Elemento ausente" },
      { input: "busca_binaria([1, 3, 5, 7, 9], 1)", expected: "0", description: "Primeiro elemento" },
    ],
    relatedLesson: "Busca e Ordenação",
  },
  {
    id: 9,
    title: "Conta Bancária",
    category: "POO",
    categoryColor: "#10B981",
    difficulty: "Avançado",
    description: `Crie uma classe \`ContaBancaria\` com:
- Atributos: \`titular\` e \`saldo\` (privado, padrão 0)
- Método \`depositar(valor)\`: adiciona ao saldo se valor > 0
- Método \`sacar(valor)\`: remove do saldo se houver saldo suficiente, retorna True/False
- Propriedade \`saldo\` para leitura do saldo

**Exemplo:**
- conta = ContaBancaria("Ana")
- conta.depositar(500)
- conta.sacar(200) → True
- conta.saldo → 300`,
    starterCode: `class ContaBancaria:
    def __init__(self, titular, saldo=0):
        # Escreva seu código aqui
        pass

    def depositar(self, valor):
        pass

    def sacar(self, valor):
        pass

    @property
    def saldo(self):
        pass


conta = ContaBancaria("Ana")
conta.depositar(500)
print(conta.sacar(200))  # True
print(conta.saldo)        # 300
print(conta.sacar(400))  # False`,
    hints: [
      "Use self.__saldo para tornar o saldo privado",
      "No depositar, verifique se valor > 0 antes de adicionar",
      "No sacar, verifique se valor <= self.__saldo antes de subtrair",
      "A @property retorna self.__saldo",
    ],
    testCases: [
      { input: "c = ContaBancaria('Ana'); c.depositar(500); c.saldo", expected: "500", description: "Depósito" },
      { input: "c = ContaBancaria('Ana'); c.depositar(500); c.sacar(200)", expected: "True", description: "Saque válido" },
      { input: "c = ContaBancaria('Ana'); c.depositar(500); c.sacar(200); c.saldo", expected: "300", description: "Saldo após saque" },
      { input: "c = ContaBancaria('Ana'); c.sacar(100)", expected: "False", description: "Saque sem saldo" },
    ],
    relatedLesson: "Classes e Objetos",
  },
  {
    id: 10,
    title: "Ordenação Bubble Sort",
    category: "Algoritmos",
    categoryColor: "#F59E0B",
    difficulty: "Avançado",
    description: `Implemente o algoritmo Bubble Sort na função \`bubble_sort\` que recebe uma lista e retorna ela ordenada em ordem crescente. Não use o método .sort() ou sorted().

**Exemplo:**
- bubble_sort([5, 3, 8, 1, 2]) → [1, 2, 3, 5, 8]`,
    starterCode: `def bubble_sort(arr):
    # Escreva seu código aqui
    # Não use arr.sort() ou sorted()
    pass


print(bubble_sort([5, 3, 8, 1, 2]))   # [1, 2, 3, 5, 8]
print(bubble_sort([9, 7, 3]))         # [3, 7, 9]`,
    hints: [
      "Use dois loops aninhados for",
      "O loop interno vai de 0 até n-i-1 (elementos já ordenados ficam no final)",
      "Compare arr[j] e arr[j+1] — se arr[j] > arr[j+1], faça a troca",
      "Troca: arr[j], arr[j+1] = arr[j+1], arr[j]",
    ],
    testCases: [
      { input: "bubble_sort([5, 3, 8, 1, 2])", expected: "[1, 2, 3, 5, 8]", description: "Lista desordenada" },
      { input: "bubble_sort([9, 7, 3])", expected: "[3, 7, 9]", description: "3 elementos" },
      { input: "bubble_sort([1])", expected: "[1]", description: "Lista unitária" },
    ],
    relatedLesson: "Busca e Ordenação",
  },
];

export const challengeCategories = ["Todas", "Fundamentos", "Estruturas de Dados", "POO", "Algoritmos"];
export const difficultyLevels = ["Todas", "Básico", "Intermediário", "Avançado"];