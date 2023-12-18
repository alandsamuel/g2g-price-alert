const axios = require('axios');
const { 
    SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,
    EmbedBuilder 
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const cookie = "Locale-Supported=en; Device-Id=XINvNyV1EnTdIhftknRK; NTES_YD_SESS=lgAKXg2Als2GpGIRFHkhQnAfngIrxvR1waC9N9qoBi6E_gBDX64yNC9U9kuNh382.3SKIXrQbzHiuxb6km8QpqlkpEEW3s.DxIQlzhGnwe0vJNN.jrsh8cGyvP4tj46tvy2ijDRxwtnJmNBWoWt.SNEsJSdJHTmAGR2165xX0XXkqa0Lv7S5Bjaujx8.RezaLmp.ucM6Secksx5nGSm3VbBBRJq8_qIM3TuaOrlyMkVNSctGT2aKS9.yY; S_INFO=1701778789|0|0&60##|62-87718791005; P_INFO=62-87718791005|1701778789|1|netease_buff|00&99|null&null&null#not_found&null#10#0|&0||62-87718791005; session=1-Z25LDAwI0YHu1mmMZi-4dKi3i9NrO0PciCYf4yoTB9wE2029974569; to_steam_processing_click231205T20669407131=1; steam_verify_result=; to_steam_processing_click231208T20653446711=1; to_steam_processing_click231210T20704087621=1; game=csgo; csrf_token=ImJlM2I0OTg5NGYxMjA0Y2ZkMjI5NGU4YzcxNTZiZTc0ZjE0YjgwNjki.GGH9TA.0tkciA9g9hbIk2fDCcdo70yuiEs"
const createEmbed = (data) => {
    const { goods_info, sell_min_price, name, steam_market_url, id } = data
    const { icon_url , steam_price_cny} = goods_info

    const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(name)
	.setURL(steam_market_url)
    .setDescription('All Price are in yuan (RMB)')
	.setThumbnail(icon_url)
    .setAuthor({
        name: "Steam Market",
        url: `https://buff.163.com/goods/${id}?from=market#tab=selling`
    })
	.addFields(
		{ name: 'Steam Price', value: steam_price_cny, inline: true},
        { name: 'Buff Price', value: sell_min_price, inline: true},
        { name: 'Difference (%)', value: `${(sell_min_price/steam_price_cny)*100}%`, inline: true}
	)
	.setTimestamp()
	.setFooter({ text: 'Get price from Buff By Aland Tiwa (2023)', iconURL: 'https://avatars.githubusercontent.com/u/19792431?v=4' });

    return embed;
}

const search = async (interaction) => {
    const input = interaction.options.getString('input') ?? 'No input provided';
    const splittedTerm = input.split(' ');
    let term = splittedTerm[0];
    if(splittedTerm.length > 1) term = splittedTerm.join('+'); 
    const url = `https://buff.163.com/api/market/goods?game=csgo&page_num=1&search=${term}&use_suggestion=0&_=1702914247950`
    const button = new ButtonBuilder()
	.setLabel('See on buff123 website')
	.setURL(`https://buff.163.com/market/csgo#tab=selling&page_num=1&search=${term}`)
	.setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
    .addComponents(button);

    const { data:result } = await axios.get(url, {headers: { cookie }});
    if(result.data.items.length <= 0) return interaction.reply('No item found')

    const embeds = []
    for (let index = 0; index <= 9; index++) {
        const item = result.data.items[index];
        embeds.push(createEmbed(item))
    }

    await interaction.reply({
        content: 'Here is the top 10 Result : ',
        embeds,
        components: [row]
    });

    //cleanup after 10Minutes
    await wait(600000);
    await interaction.deleteReply();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search item on')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Search term')
                .setRequired(true)),
	async execute(interaction) {
		await search(interaction);
	},
};