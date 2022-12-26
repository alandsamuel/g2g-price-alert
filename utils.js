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
            service_id, region_id, offer_attributes,
            available_qty, min_qty, user_level
        } = seller;
        const serverName = title.split(' ')[0];
        const url = `https://www.g2g.com/offer/${serverName}---EU-Central?service_id=${service_id}&brand_id=${brand_id}&region_id=${region_id}&fa=${offer_attributes[0].collection_id}:${offer_attributes[0].dataset_id}&sort=lowest_price&include_offline=1`
        const price = converted_unit_price.toFixed(2);
        const priceData = {
            "title" : `${username} | Seller level : ${user_level}`,
            "description": `**Price : Rp. ${price} \nAvailable Qty: ${available_qty} \nMinimum Qty: ${min_qty}**  \n\n ${description}`,
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
        cheapest.push(`${index+1}. ${title} | ${username} | Rp. ${price}`);
    };

    const content = {
        "content": `**G2A Price Info :money_with_wings::money_with_wings::money_with_wings:** \n\nFound new **3 cheapest price** on Lost Ark Golds Category\nCheapest is :\n**${cheapest[0]}**\n**${cheapest[1]}**\n**${cheapest[2]}**\n\n-`,
        "avatar_url": avatarUrl,
        embeds
    };

    
    return content;
}

module.exports = {
    generateDiscordMessage
}