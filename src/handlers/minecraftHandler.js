const { EmbedBuilder } = require('discord.js');

const CHANNELS = {
  ban:     '1510207834208342176',
  kick:    '1510207873211433011',
  command: '1510207888260599889',
  mute:    '1510208130930184222',
  // طك-باند نفس الباند
  leave:   '1510208212861845504',
  join:    '1510208234508779530',
  death:   '1510208276309082172',
  kill:    '1510208305979457699',
  chat:    '1510209963190915092',
};

function getChannel(client, id) {
  return id ? client.channels.cache.get(id) : null;
}

module.exports = function setupMinecraftWebhook(app, client) {
  app.post('/minecraft', (req, res) => {
    const { type, data } = req.body;
    if (!type || !data) return res.status(400).json({ error: 'بيانات ناقصة' });

    let embed, channelId;

    switch (type) {

      case 'ban':
        channelId = CHANNELS.ban;
        embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('🔨 لاعب تم باند')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '👮 المسؤول', value: data.admin || 'غير معروف', inline: true },
            { name: '📝 السبب', value: data.reason || 'لا يوجد', inline: false },
            { name: '⏰ المدة', value: data.duration || 'دائم', inline: true },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'kick':
        channelId = CHANNELS.kick;
        embed = new EmbedBuilder()
          .setColor('#FF8C00')
          .setTitle('👢 لاعب تم كيك')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '👮 المسؤول', value: data.admin || 'غير معروف', inline: true },
            { name: '📝 السبب', value: data.reason || 'لا يوجد', inline: false },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'command':
        channelId = CHANNELS.command;
        embed = new EmbedBuilder()
          .setColor('#5865F2')
          .setTitle('💻 أمر نُفِّذ')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 المنفذ', value: data.player || 'Console', inline: true },
            { name: '📝 الأمر', value: `\`${data.command || 'غير معروف'}\``, inline: false },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'mute':
        channelId = CHANNELS.mute;
        embed = new EmbedBuilder()
          .setColor('#FFA500')
          .setTitle('🔇 لاعب تم ميوت')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '👮 المسؤول', value: data.admin || 'غير معروف', inline: true },
            { name: '📝 السبب', value: data.reason || 'لا يوجد', inline: false },
            { name: '⏰ المدة', value: data.duration || 'دائم', inline: true },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'leave':
        channelId = CHANNELS.leave;
        embed = new EmbedBuilder()
          .setColor('#FF4444')
          .setTitle('🔴 لاعب خرج من السيرفر')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '⏱️ وقت اللعب', value: data.playtime || 'غير معروف', inline: true },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'join':
        channelId = CHANNELS.join;
        embed = new EmbedBuilder()
          .setColor('#00FF7F')
          .setTitle('🟢 لاعب دخل السيرفر')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '👥 اللاعبين', value: `${data.online || '?'} / ${data.max || '?'}`, inline: true },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'death':
        channelId = CHANNELS.death;
        embed = new EmbedBuilder()
          .setColor('#808080')
          .setTitle('💀 وفاة لاعب')
          .setThumbnail(`https://mineskin.eu/helm/${data.player}/100.png`)
          .addFields(
            { name: '👤 اللاعب', value: data.player || 'غير معروف', inline: true },
            { name: '💬 السبب', value: data.cause || 'غير معروف', inline: true },
            { name: '📍 المكان', value: data.location || 'غير معروف', inline: false },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'kill':
        channelId = CHANNELS.kill;
        embed = new EmbedBuilder()
          .setColor('#FF4444')
          .setTitle('⚔️ عملية قتل')
          .setThumbnail(`https://mineskin.eu/helm/${data.killer}/100.png`)
          .addFields(
            { name: '⚔️ القاتل', value: data.killer || 'غير معروف', inline: true },
            { name: '💀 الضحية', value: data.victim || 'غير معروف', inline: true },
            { name: '🗡️ السلاح', value: data.weapon || 'يد فارغة', inline: true },
            { name: '📍 المكان', value: data.location || 'غير معروف', inline: false },
          )
          .setFooter({ text: 'Minecraft Logs' }).setTimestamp();
        break;

      case 'chat':
        channelId = CHANNELS.chat;
        embed = new EmbedBuilder()
          .setColor('#5865F2')
          .setAuthor({ name: data.player || 'غير معروف', iconURL: `https://mineskin.eu/helm/${data.player}/100.png` })
          .setDescription(`💬 ${data.message || '...'}`)
          .setFooter({ text: 'Minecraft Chat' }).setTimestamp();
        break;

      default:
        return res.status(400).json({ error: 'نوع غير معروف' });
    }

    const channel = getChannel(client, channelId);
    if (channel) channel.send({ embeds: [embed] }).catch(() => {});
    res.json({ success: true });
  });
};
