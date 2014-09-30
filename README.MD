Nesse post abordarei uma modelagem um pouco mais complexa que de um sistema de blogs, será a de um catálogo de produtos, uma ideia inicial para a criação de um ecommerce.


Nosso sistema precisa ter a capacidade de armazenar vários tipos diferentes de objetos e seu relecaionamentos, isso pode implicar em vários problemas na modelagem quando se está pensando no modelo relacional ainda.

http://nomadev.com.br/![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_9_19_03_AM.png)

Nessa modelagem temos o produto que possui categoria e tags, o pedido que é ligado a produtos e usuários. E nosso usuário possui endereço com cidade, estado e país.

Bom você percebeu como conseguimos separar em 3 contextos diferentes nosso sistema?

- produto
- pedido
- usuário

Partindo dessa informação podemos iniciar a modelagem da agregação no MongoDb, utilizando exatamente esses 3 contextos como objetos agregadores dos dados, não entendi **porra** nenhuma!

Ok, então vamos ao código que ficará mais fácil.

##Produto
![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_10_03_29_AM.png)

Nesse agregado juntamos as informações do produto com categoria e tags.

##Pedido![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_9_35_01_AM.png)

No agregado do pedido ligamos os produtos e o usuário.

##Usuário
![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_9_38_02_AM.png)
Para o usuário nós agregamos o endereço, cidade, estado e país.

##Conclusão

Percebeu como em vez de separarmos os dados agora nós os agregamos? É dessa forma que temos que trabalhar com o MongoDb, isso contribui muito para nossas buscas já que o MongoDb não possui *JOINS* e o forte dele é sua velocidade na busca, quanto mais dados agregados serem entregues em uma única query mais performático seu sistema será.

Bah mas então se que quiser buscar os pedidos eu ainda terei que ter uma query para buscar o usuário e outra para os produtos?

Exatamente!

Mas calma essa modelagem ainda não está ótima, vamos refatorar ela levando em mente que a função principal do nosso sistema de gerenciamento é a listagem dos pedidos feitos pelo usuário, nesse caso vamos agregar o pedido na coleção de usuário ficando assim:

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_9_44_33_AM.png)

Mas por que isso tio Suissa?

Para que nossa busca principal, que é a listagem dos pedidos do usuário, seja feita da maneira mais rápida possível apenas com duas consultas: usuário e produtos. Pois a listagem dos pedidos já está agregada no usuário não necessitando fazer uma consulta apenas para isso.

##API

###Inserindo produto

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_10_49_51_AM.png)

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_10_50_14_AM.png)


##Inserindo usuário

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_11_06_50_AM.png)

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_11_07_23_AM.png)

##Adicionando Produto ao Pedido

![](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_11_44_34_AM.png)
![API Route](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_11_48_15_AM.png)
![Controller](http://nomadev.com.br/content/images/2014/Sep/Screen_Shot_2014_09_30_at_11_47_25_AM.png)

Para inserir um produto nós na verdade precisamos alterar nosso usuário e atualizar o *array* de pedidos adicionando o objeto do nosso produto, por isso usamoso seguinte objeto modificador com a função de *update*:

    var mod = {$push: {"orders.products": product}};

    Model.update(query, mod, function(err, data) {
      cb(err, data, res);
    });
