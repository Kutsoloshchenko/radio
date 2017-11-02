"""Module for getting src of random beartato image"""

import requests
from lxml import html


def get_beartato():
    """Gets link to a random beartato image
        returns:
                tuple with image title, image alternative title and image source
    """

    response = requests.get('http://nedroid.com//?randomcomic=1')
    page = html.fromstring(response.content)
    image_item = page.xpath('//div[@id="comic"]/img')[0]
    return {"image_title": image_item.get('title'),
            "image_source": image_item.get('src'),
            "image_alt": image_item.get('alt')}
