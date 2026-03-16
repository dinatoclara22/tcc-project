export interface Lesson {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  duration: string;
  content: {
    intro: string;
    sections: {
      subtitle: string;
      text: string;
      code?: string;
    }[];
  };
}

export const lessons: Lesson[] = [
  // FUNDAMENTOS
  {
    id: 1,
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    title: "Variáveis e Tipos de Dados",
    description: "Aprenda a declarar variáveis e entenda os tipos primitivos do Python.",
    duration: "15 min",
    content: {
      intro: "Em Python, variáveis são criadas no momento da atribuição, sem necessidade de declaração de tipo. O interpretador infere o tipo automaticamente.",
      sections: [
        {
          subtitle: "Declarando variáveis",
          text: "Basta usar o operador = para criar uma variável. O nome deve começar com letra ou underscore, e não pode conter espaços.",
          code: `# Declarando variáveis
nome = "Maria"
idade = 21
altura = 1.65
matriculada = True

print(nome)       # Maria
print(type(nome)) # <class 'str'>`,
        },
        {
          subtitle: "Tipos primitivos",
          text: "Python possui quatro tipos primitivos principais: int (inteiros), float (decimais), str (texto) e bool (verdadeiro/falso).",
          code: `inteiro  = 42           # int
decimal  = 3.14         # float
texto    = "Python"     # str
logico   = True         # bool

# Verificando tipos
print(type(inteiro))  # <class 'int'>
print(type(decimal))  # <class 'float'>`,
        },
        {
          subtitle: "Conversão de tipos (casting)",
          text: "É possível converter entre tipos usando as funções int(), float(), str() e bool().",
          code: `numero_str = "100"
numero_int = int(numero_str)   # "100" → 100

pi_str = str(3.14)             # 3.14 → "3.14"
resultado = float("2.5") + 1   # 3.5

print(numero_int + 50)  # 150`,
        },
      ],
    },
  },
  {
    id: 2,
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    title: "Operadores e Expressões",
    description: "Domine os operadores aritméticos, lógicos e de comparação.",
    duration: "20 min",
    content: {
      intro: "Python oferece um conjunto completo de operadores para manipular dados. Entender esses operadores é essencial para escrever qualquer lógica de programa.",
      sections: [
        {
          subtitle: "Operadores Aritméticos",
          text: "Utilizados para operações matemáticas básicas.",
          code: `a, b = 10, 3

print(a + b)   # 13  → adição
print(a - b)   # 7   → subtração
print(a * b)   # 30  → multiplicação
print(a / b)   # 3.33 → divisão real
print(a // b)  # 3   → divisão inteira
print(a % b)   # 1   → módulo (resto)
print(a ** b)  # 1000 → potenciação`,
        },
        {
          subtitle: "Operadores de Comparação",
          text: "Retornam um valor booleano (True ou False).",
          code: `x = 5

print(x == 5)  # True  → igual
print(x != 3)  # True  → diferente
print(x > 3)   # True  → maior
print(x < 3)   # False → menor
print(x >= 5)  # True  → maior ou igual
print(x <= 4)  # False → menor ou igual`,
        },
        {
          subtitle: "Operadores Lógicos",
          text: "Combinam expressões booleanas.",
          code: `a, b = True, False

print(a and b)  # False → ambos devem ser True
print(a or b)   # True  → pelo menos um True
print(not a)    # False → inverte o valor

# Uso prático
idade = 20
tem_carteira = True
pode_dirigir = idade >= 18 and tem_carteira
print(pode_dirigir)  # True`,
        },
      ],
    },
  },
  {
    id: 3,
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    title: "Condicionais: if, elif, else",
    description: "Controle o fluxo do seu programa com estruturas condicionais.",
    duration: "20 min",
    content: {
      intro: "As estruturas condicionais permitem que o programa tome decisões com base em condições. Em Python, a indentação (espaços) define os blocos de código.",
      sections: [
        {
          subtitle: "Estrutura básica if/else",
          text: "O bloco if é executado quando a condição é verdadeira. O else é executado quando ela é falsa.",
          code: `nota = 7.5

if nota >= 6:
    print("Aprovado!")
else:
    print("Reprovado.")

# Saída: Aprovado!`,
        },
        {
          subtitle: "Múltiplas condições com elif",
          text: "Use elif para verificar várias condições em sequência.",
          code: `nota = 8.2

if nota >= 9:
    print("Excelente")
elif nota >= 7:
    print("Bom")
elif nota >= 6:
    print("Regular")
else:
    print("Reprovado")

# Saída: Bom`,
        },
        {
          subtitle: "Operador ternário",
          text: "Uma forma compacta de escrever condicionais simples em uma linha.",
          code: `idade = 17
status = "Maior" if idade >= 18 else "Menor"
print(status)  # Menor

# Equivale a:
# if idade >= 18:
#     status = "Maior"
# else:
#     status = "Menor"`,
        },
      ],
    },
  },
  {
    id: 4,
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    title: "Loops: for e while",
    description: "Aprenda a repetir ações com os laços de repetição do Python.",
    duration: "25 min",
    content: {
      intro: "Loops permitem executar um bloco de código múltiplas vezes. Python possui dois tipos principais: for (para iterar sobre sequências) e while (enquanto uma condição for verdadeira).",
      sections: [
        {
          subtitle: "Loop for",
          text: "Itera sobre uma sequência (lista, string, range, etc.).",
          code: `# Iterando com range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Iterando sobre lista
frutas = ["maçã", "banana", "uva"]
for fruta in frutas:
    print(fruta)

# Com índice usando enumerate
for idx, fruta in enumerate(frutas):
    print(f"{idx}: {fruta}")`,
        },
        {
          subtitle: "Loop while",
          text: "Executa enquanto a condição for verdadeira. Cuidado com loops infinitos!",
          code: `contador = 0
while contador < 5:
    print(f"Contagem: {contador}")
    contador += 1

# break → sai do loop
# continue → pula para próxima iteração
for n in range(10):
    if n == 5:
        break
    if n % 2 == 0:
        continue
    print(n)  # 1, 3`,
        },
        {
          subtitle: "List Comprehension",
          text: "Uma sintaxe poderosa para criar listas de forma compacta.",
          code: `# Forma tradicional
quadrados = []
for x in range(1, 6):
    quadrados.append(x ** 2)

# Com List Comprehension
quadrados = [x ** 2 for x in range(1, 6)]
print(quadrados)  # [1, 4, 9, 16, 25]

# Com condição
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]`,
        },
      ],
    },
  },
  {
    id: 5,
    category: "Fundamentos",
    categoryColor: "#7C3AED",
    title: "Funções",
    description: "Crie blocos de código reutilizáveis com def e aprenda sobre parâmetros.",
    duration: "30 min",
    content: {
      intro: "Funções são blocos de código nomeados e reutilizáveis. Elas ajudam a organizar o programa, evitar repetição e tornar o código mais legível.",
      sections: [
        {
          subtitle: "Definindo e chamando funções",
          text: "Use def para criar uma função, seguido do nome e parênteses.",
          code: `def saudar(nome):
    return f"Olá, {nome}!"

mensagem = saudar("Ana")
print(mensagem)  # Olá, Ana!

# Parâmetros com valor padrão
def potencia(base, expoente=2):
    return base ** expoente

print(potencia(3))     # 9
print(potencia(2, 10)) # 1024`,
        },
        {
          subtitle: "Múltiplos retornos e args",
          text: "Python permite retornar múltiplos valores e aceitar número variável de argumentos.",
          code: `# Múltiplos retornos
def min_max(lista):
    return min(lista), max(lista)

menor, maior = min_max([3, 1, 8, 2])
print(menor, maior)  # 1 8

# *args → múltiplos argumentos
def somar(*numeros):
    return sum(numeros)

print(somar(1, 2, 3, 4))  # 10`,
        },
        {
          subtitle: "Funções lambda",
          text: "Funções anônimas e compactas para operações simples.",
          code: `# Lambda: func anônima de uma linha
dobrar = lambda x: x * 2
print(dobrar(5))  # 10

# Uso comum com sorted/map/filter
nums = [5, 2, 8, 1, 9]
ordenado = sorted(nums, key=lambda x: -x)
print(ordenado)  # [9, 8, 5, 2, 1]

quadrados = list(map(lambda x: x**2, [1,2,3]))
print(quadrados)  # [1, 4, 9]`,
        },
      ],
    },
  },
  // ESTRUTURAS DE DADOS
  {
    id: 6,
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    title: "Listas",
    description: "A estrutura de dados mais versátil do Python — mutável e ordenada.",
    duration: "25 min",
    content: {
      intro: "Listas são coleções ordenadas e mutáveis. São uma das estruturas mais usadas em Python e suportam elementos de tipos diferentes.",
      sections: [
        {
          subtitle: "Criando e acessando listas",
          text: "Use colchetes [ ] para criar listas. O índice começa em 0.",
          code: `frutas = ["maçã", "banana", "uva", "laranja"]

print(frutas[0])   # maçã  (primeiro)
print(frutas[-1])  # laranja (último)
print(frutas[1:3]) # ['banana', 'uva'] (fatiamento)

# Verificando tamanho
print(len(frutas))  # 4`,
        },
        {
          subtitle: "Modificando listas",
          text: "Listas são mutáveis — você pode adicionar, remover e alterar elementos.",
          code: `nums = [1, 2, 3]

nums.append(4)      # [1, 2, 3, 4]
nums.insert(0, 0)   # [0, 1, 2, 3, 4]
nums.remove(2)      # [0, 1, 3, 4]
ultimo = nums.pop() # Remove e retorna o último

nums.sort()         # Ordena in-place
nums.reverse()      # Inverte in-place
copia = nums.copy() # Cria uma cópia`,
        },
        {
          subtitle: "Métodos úteis",
          text: "Python oferece muitos métodos prontos para trabalhar com listas.",
          code: `notas = [7, 8, 9, 6, 8, 10]

print(sum(notas))        # 48
print(min(notas))        # 6
print(max(notas))        # 10
print(notas.count(8))    # 2 (quantas vezes 8 aparece)
print(notas.index(9))    # 2 (posição do 9)

media = sum(notas) / len(notas)
print(f"Média: {media:.1f}")  # 8.0`,
        },
      ],
    },
  },
  {
    id: 7,
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    title: "Dicionários",
    description: "Armazene dados em pares chave-valor para acesso rápido e organizado.",
    duration: "25 min",
    content: {
      intro: "Dicionários são coleções de pares chave-valor. São mutáveis, não ordenados (em versões antigas) e extremamente eficientes para busca.",
      sections: [
        {
          subtitle: "Criando e acessando dicionários",
          text: "Use chaves { } com pares chave: valor.",
          code: `aluno = {
    "nome": "Carlos",
    "idade": 20,
    "curso": "Ciência da Computação",
    "notas": [8, 9, 7]
}

print(aluno["nome"])           # Carlos
print(aluno.get("cidade", "N/A"))  # N/A (padrão se não existir)`,
        },
        {
          subtitle: "Modificando e iterando",
          text: "Adicione, atualize ou remova chaves facilmente.",
          code: `aluno["email"] = "carlos@uni.com"  # Adiciona
aluno["idade"] = 21               # Atualiza
del aluno["notas"]                # Remove

# Iterando
for chave, valor in aluno.items():
    print(f"{chave}: {valor}")

# Apenas chaves ou valores
print(list(aluno.keys()))
print(list(aluno.values()))`,
        },
        {
          subtitle: "Dict Comprehension",
          text: "Crie dicionários de forma compacta usando comprehension.",
          code: `# Quadrados de 1 a 5
quadrados = {x: x**2 for x in range(1, 6)}
print(quadrados)
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filtrando apenas pares
pares = {k: v for k, v in quadrados.items() if v % 2 == 0}
print(pares)  # {2: 4, 4: 16}`,
        },
      ],
    },
  },
  {
    id: 8,
    category: "Estruturas de Dados",
    categoryColor: "#0EA5E9",
    title: "Tuplas e Sets",
    description: "Conheça coleções imutáveis (tuplas) e coleções sem duplicatas (sets).",
    duration: "20 min",
    content: {
      intro: "Tuplas são como listas, mas imutáveis. Sets são coleções não ordenadas sem elementos duplicados — ideais para operações matemáticas de conjuntos.",
      sections: [
        {
          subtitle: "Tuplas",
          text: "Criadas com parênteses ( ). Após criadas, não podem ser modificadas.",
          code: `coordenadas = (10.5, -23.4)
rgb = (255, 128, 0)

# Desempacotamento
x, y = coordenadas
print(x)  # 10.5

# Tuplas são mais rápidas que listas
# Úteis para dados que não devem mudar
ponto = (3, 4)
print(ponto[0])  # 3`,
        },
        {
          subtitle: "Sets (Conjuntos)",
          text: "Criados com chaves { } ou set(). Não permitem duplicatas.",
          code: `linguagens = {"Python", "Java", "Python", "C++"}
print(linguagens)  # {'Python', 'Java', 'C++'} — sem duplicata

# Operações de conjunto
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A | B)   # União: {1,2,3,4,5,6}
print(A & B)   # Interseção: {3, 4}
print(A - B)   # Diferença: {1, 2}
print(A ^ B)   # Simétrica: {1,2,5,6}`,
        },
      ],
    },
  },
  // POO
  {
    id: 9,
    category: "POO",
    categoryColor: "#10B981",
    title: "Classes e Objetos",
    description: "Entenda o paradigma orientado a objetos criando suas primeiras classes.",
    duration: "35 min",
    content: {
      intro: "Programação Orientada a Objetos (POO) organiza o código em torno de objetos que combinam dados (atributos) e comportamentos (métodos). Em Python, tudo é um objeto.",
      sections: [
        {
          subtitle: "Criando sua primeira classe",
          text: "Use class para definir uma classe. O método __init__ é o construtor.",
          code: `class Aluno:
    def __init__(self, nome, matricula):
        self.nome = nome
        self.matricula = matricula
        self.notas = []

    def adicionar_nota(self, nota):
        self.notas.append(nota)

    def calcular_media(self):
        if not self.notas:
            return 0
        return sum(self.notas) / len(self.notas)

# Criando objetos
a1 = Aluno("Ana", "2024001")
a1.adicionar_nota(8.5)
a1.adicionar_nota(9.0)
print(a1.calcular_media())  # 8.75`,
        },
        {
          subtitle: "Atributos e encapsulamento",
          text: "Use _ (convencional) ou __ (name mangling) para indicar atributos privados.",
          code: `class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.__saldo = saldo  # privado

    def depositar(self, valor):
        if valor > 0:
            self.__saldo += valor

    def sacar(self, valor):
        if valor <= self.__saldo:
            self.__saldo -= valor
            return True
        return False

    @property
    def saldo(self):
        return self.__saldo

conta = ContaBancaria("Pedro", 1000)
conta.depositar(500)
print(conta.saldo)  # 1500`,
        },
        {
          subtitle: "Métodos especiais (__dunder__)",
          text: "Métodos com duplo underscore definem comportamentos especiais dos objetos.",
          code: `class Vetor:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vetor({self.x}, {self.y})"

    def __add__(self, outro):
        return Vetor(self.x + outro.x, self.y + outro.y)

    def __len__(self):
        return int((self.x**2 + self.y**2) ** 0.5)

v1 = Vetor(3, 4)
v2 = Vetor(1, 2)
print(v1 + v2)   # Vetor(4, 6)
print(len(v1))   # 5`,
        },
      ],
    },
  },
  {
    id: 10,
    category: "POO",
    categoryColor: "#10B981",
    title: "Herança e Polimorfismo",
    description: "Reaproveite código com herança e crie interfaces flexíveis com polimorfismo.",
    duration: "35 min",
    content: {
      intro: "Herança permite que uma classe filha herde atributos e métodos de uma classe pai. Polimorfismo permite que objetos de diferentes classes respondam ao mesmo método de formas distintas.",
      sections: [
        {
          subtitle: "Herança simples",
          text: "A classe filha passa o nome da classe pai entre parênteses.",
          code: `class Animal:
    def __init__(self, nome):
        self.nome = nome

    def falar(self):
        return "..."

class Cachorro(Animal):
    def falar(self):
        return "Au au!"

class Gato(Animal):
    def falar(self):
        return "Miau!"

animais = [Cachorro("Rex"), Gato("Mimi")]
for a in animais:
    print(f"{a.nome}: {a.falar()}")`,
        },
        {
          subtitle: "super() e extensão",
          text: "Use super() para chamar o método da classe pai.",
          code: `class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def apresentar(self):
        return f"Sou {self.nome}, {self.idade} anos"

class Professor(Pessoa):
    def __init__(self, nome, idade, disciplina):
        super().__init__(nome, idade)
        self.disciplina = disciplina

    def apresentar(self):
        base = super().apresentar()
        return f"{base}, ensino {self.disciplina}"

p = Professor("Carlos", 35, "Python")
print(p.apresentar())`,
        },
      ],
    },
  },
  // ALGORITMOS
  {
    id: 11,
    category: "Algoritmos",
    categoryColor: "#F59E0B",
    title: "Recursão",
    description: "Resolva problemas elegantes com funções que chamam a si mesmas.",
    duration: "30 min",
    content: {
      intro: "Recursão é quando uma função chama a si mesma para resolver um problema menor. Toda função recursiva precisa de um caso base (condição de parada) para não gerar loop infinito.",
      sections: [
        {
          subtitle: "Estrutura de uma função recursiva",
          text: "Sempre defina o caso base primeiro, depois a chamada recursiva.",
          code: `def fatorial(n):
    # Caso base
    if n == 0 or n == 1:
        return 1
    # Chamada recursiva
    return n * fatorial(n - 1)

print(fatorial(5))  # 120
# 5 * 4 * 3 * 2 * 1 = 120`,
        },
        {
          subtitle: "Fibonacci recursivo e memoização",
          text: "A memoização armazena resultados já calculados para evitar recalculo.",
          code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
print(fibonacci(30))  # 832040

# Sem memoização seria muito lento!`,
        },
        {
          subtitle: "Torres de Hanói",
          text: "Um problema clássico que demonstra o poder da recursão.",
          code: `def hanoi(n, origem, destino, auxiliar):
    if n == 1:
        print(f"Mova disco 1: {origem} → {destino}")
        return
    hanoi(n-1, origem, auxiliar, destino)
    print(f"Mova disco {n}: {origem} → {destino}")
    hanoi(n-1, auxiliar, destino, origem)

hanoi(3, "A", "C", "B")
# Mova disco 1: A → C
# Mova disco 2: A → B
# ...`,
        },
      ],
    },
  },
  {
    id: 12,
    category: "Algoritmos",
    categoryColor: "#F59E0B",
    title: "Busca e Ordenação",
    description: "Implemente algoritmos clássicos de busca binária e ordenação.",
    duration: "40 min",
    content: {
      intro: "Algoritmos de busca e ordenação são fundamentais em computação. Entender como eles funcionam e sua complexidade (Big O) é essencial para escrever código eficiente.",
      sections: [
        {
          subtitle: "Busca Linear vs Binária",
          text: "Busca linear é O(n). Busca binária é O(log n), mas exige lista ordenada.",
          code: `def busca_binaria(lista, alvo):
    esq, dir = 0, len(lista) - 1
    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir = meio - 1
    return -1

nums = [1, 3, 5, 7, 9, 11, 13]
print(busca_binaria(nums, 7))   # 3
print(busca_binaria(nums, 10))  # -1`,
        },
        {
          subtitle: "Bubble Sort e Quick Sort",
          text: "Dois algoritmos de ordenação com complexidades diferentes.",
          code: `# Bubble Sort — O(n²)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Quick Sort — O(n log n) médio
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    esq = [x for x in arr if x < pivot]
    meio = [x for x in arr if x == pivot]
    dir = [x for x in arr if x > pivot]
    return quick_sort(esq) + meio + quick_sort(dir)

print(quick_sort([3,6,8,10,1,2,1]))`,
        },
      ],
    },
  },
];

export const categories = ["Todas", "Fundamentos", "Estruturas de Dados", "POO", "Algoritmos"];
