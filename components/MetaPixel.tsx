"use client";

import Script from "next/script";

/**
 * Pixel da Meta (Facebook/Instagram).
 *
 * O ID é público por natureza — ele aparece no HTML de qualquer site que use
 * pixel. O que NUNCA pode vir para cá é o token da API de Conversões: esse
 * fica só no backend (ver `app/services/meta_capi.py`).
 *
 * O evento de compra (`Purchase`) também NÃO sai daqui. O pagamento é PIX e
 * só é confirmado no webhook da Wiven, quando o cliente normalmente já fechou
 * a aba — então ele é disparado pelo servidor, que é a única fonte confiável.
 */

/**
 * ID do pixel "BM 01 InnoTalk".
 *
 * Fica com valor padrão porque é público e precisa funcionar sem depender de
 * configuração extra na Vercel. Para DESLIGAR em homologação/preview (e não
 * sujar os dados reais do pixel), defina a variável como string vazia:
 *
 *     NEXT_PUBLIC_META_PIXEL_ID=
 */
export const META_PIXEL_ID =
    process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1116295284122674";

/**
 * Dispara um evento no pixel, se ele estiver carregado.
 *
 * Seguro de chamar em qualquer lugar: se o pixel não carregou (bloqueador de
 * anúncio, variável não configurada, SSR), a função simplesmente não faz nada.
 */
export function trackPixel(event: string, params?: Record<string, unknown>): void
{
    if (typeof window === "undefined") return;

    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;

    try
    {
        fbq("track", event, params);
    } catch
    {
        // Rastreamento nunca pode quebrar a navegação do usuário.
    }
}

export default function MetaPixel()
{
    if (!META_PIXEL_ID) return null;

    return (
        <>
            {/* `afterInteractive`: carrega depois da página ficar utilizável,
                para o pixel não competir com a renderização do conteúdo. */}
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
                `}
            </Script>

            <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
}
