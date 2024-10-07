import type { ApiResponseOptions } from "@nestjs/swagger";


export const SkinportItemScheme: ApiResponseOptions = {
    example: [{
        market_hash_name: "AK-47 | Aquamarine Revenge (Battle-Scarred)",
        currency: "EUR",  
        suggested_price: 13.18,
        item_page: "https://skinport.com/item/csgo/ak-47-aquamarine-revenge-battle-scarred",
        market_page: "https://skinport.com/market/730?cat=Rifle&item=Aquamarine+Revenge",
        min_price: 11.33,
        max_price: 18.22,
        mean_price: 12.58,
        quantity: 25,
        created_at: 1535988253,
        updated_at: 1568073728
    }],
}

export const SkinportHistoryScheme: ApiResponseOptions = {
    example: [{
        market_hash_name: "Glove Case Key",
        currency: "EUR",
        item_page: "https://skinport.com/item/csgo/glove-case-key",
        market_page: "https://skinport.com/market/730?cat=Key&item=Glove+Case+Key",
        sales: [
          {
            price: 1.77,
            wear_value: null,
            sold_at: 1568005548
          },
          {
            price: 1.77,
            wear_value: null,
            sold_at: 1567816819
          },
          {
            price: 1.77,
            wear_value: null,
            sold_at: 1567816819
          }
        ],
        last_7_days: {
          min: 1.77,
          max: 1.95,
          avg: 1.81,
          volume: 4
        },
        last_30_days: {
          min: 1.77,
          max: 2.03,
          avg: 1.93,
          volume: 59
        },
        last_90_days: {
          min: 1.77,
          max: 2.03,
          avg: 1.93,
          volume: 68
        }
      }]
}

export const SkinportOutOfStockScheme: ApiResponseOptions = {
    example: [
        {
            market_hash_name: "Souvenir AWP | Desert Hydra (Factory New)",
            version: null,
            currency: "EUR",
            suggested_price: 9995.66,
            avg_sale_price: 6287.45,
            sales_last_90d: 6
        },
        {
            market_hash_name: "★ Butterfly Knife | Gamma Doppler (Factory New)",
            version: "Emerald",
            currency: "EUR",
            suggested_price: 15110.53,
            avg_sale_price: 11786.21,
            sales_last_90d: 2
        },
        {
            market_hash_name: "★ Sport Gloves | Vice (Factory New)",
            version: null,
            currency: "EUR",
            suggested_price: 26309.29,
            avg_sale_price: 22484.59,
            sales_last_90d: 1
        },
        {
            market_hash_name: "★ Sport Gloves | Pandora's Box (Minimal Wear)",
            version: null,
            currency: "EUR",
            suggested_price: 9099.2,
            avg_sale_price: 5762.36,
            sales_last_90d: 3
        }
    ]
}

export const SkinportTransactionsScheme: ApiResponseOptions = {
    example: {
        pagination: {
            page: 1,
            pages: 1,
            limit: 100,
            order: "desc"
        },
        data: [
            {
                id: 9999993,
                type: "credit",
                sub_type: "item",
                status: "complete",
                amount: 1.57,
                fee: 0.09,
                currency: "EUR",
                items: [
                    {
                        sale_id: 9999321,
                        market_hash_name: "Mann Co. Supply Crate Key",
                        seller_country: "DE",
                        buyer_country: "DE"
                    }
                ],
                created_at: "2021-10-11T21:22:24.425Z",
                updated_at: "2021-10-11T21:22:24.425Z"
            },
            {
                id: 9999992,
                type: "withdraw",
                sub_type: null,
                status: "complete",
                amount: 1333.70,
                fee: null,
                currency: "EUR",
                items: null,
                created_at: "2021-10-11T05:30:10.880Z",
                updated_at: "2021-10-11T06:14:07.427Z"
            },
            {
                id: 9999991,
                type: "purchase",
                sub_type: null,
                status: "complete",
                amount: 90.01,
                fee: null,
                currency: "EUR",
                items: [
                    {
                        sale_id: 9999123,
                        market_hash_name: "★ Huntsman Knife",
                        seller_country: "US",
                        buyer_country: "DE"
                    }
                ],
                created_at: "2021-08-27T03:00:34.728Z",
                updated_at: "2021-08-27T03:00:58.488Z"
            }
        ]
    }
}