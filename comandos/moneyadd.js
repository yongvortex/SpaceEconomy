const Discord = require("discord.js"); // Puxando a livraria Discord.js
const db = require("quick.db"); // Puxando a livraria quick.db

exports.run = async (client, message, args) => {
  
  if (!["675439542110650399", "508369613055197241"].includes(message.author.id)) { //Apenas usuarios que forem adicionados poderão utiliar o comando
    return message.channel.send(`Ops, apenas meus devs podem utilizar este comando!`);
  }

  let member = message.mentions.users.first() || message.author; // Se não mencionar nenhum usuario mostrara o saldo do autor.
  let saldo = db.get(`money_${member.id}`);

  let quantia = args[0]; // para facilitarmos e não ficar usando args[0]
  
  if (!quantia) return message.channel.send(`Digite uma quantia para ser adicionada!`) // caso o usuário não escreva um número  
  if (isNaN(quantia)) return message.channel.send(`Você não definiu uma quantia.`);  // Se o usuario não colocar um numero ele tornará esta mensagem
  
  message.channel.send(`${message.author.username} Foram adicionados **${quantia}** na conta do membro: ${member.username}!`);
  db.subtract(`dinheiro_${member.id}`, args[0]); // Removendo na DB a quantia solicitada.
};

exports.help = { //exportanto para a handler
  name: "moneiadd",
  aliases: ["dinheiroadd", "adicionardinheiro"]
};
