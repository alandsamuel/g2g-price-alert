const moment = require('moment');

const colors = [
    5763719,
    3447003,
    10181046
]

const generateDiscordMessage = (g2gData) => {
    const avatarUrl = "https://cdn.discordapp.com/attachments/598518155589189657/1056726092024647780/favicon-1.png";
    const embeds = [];
    const cheapest = [];
    for (let index = 0; index < 3; index++) {
        const seller = g2gData[index];
        const {
            converted_unit_price, brand_id, title, 
            username, description, user_avatar, 
            service_id, region_id, offer_attributes
        } = seller;
        const serverName = title.split(' ')[0];
        const url = `https://www.g2g.com/offer/${serverName}---EU-Central?service_id=${service_id}&brand_id=${brand_id}&region_id=${region_id}&fa=${offer_attributes[0].collection_id}:${offer_attributes[0].dataset_id}&sort=lowest_price&include_offline=1`
        const priceData = {
            "title" : username,
            "description": `**Price : Rp. ${converted_unit_price}** \n\n ${description}`,
            "color": colors[index],
            url,
            "author": {
                "name": title,
                "icon_url": user_avatar,
                url
            },
            footer: {
                text: moment().format('D-mm-yyyy hh:mm'),
                "icon_url": avatarUrl
            }
        }
        embeds.push(priceData);
        cheapest.push(`${index+1}. ${title} | ${username} | Rp. ${converted_unit_price}`)
    };

    const content = {
        "content": `**Price Alert :money_with_wings::money_with_wings::money_with_wings:** \n\nFound new **cheapest price** on Lost Ark Golds\nCheapest is :\n**${cheapest[0]}**\n**${cheapest[1]}**\n**${cheapest[2]}**\n\n-`,
        "avatar_url": avatarUrl,
        embeds
    };

    
    return content;
}

module.exports = {
    generateDiscordMessage
}