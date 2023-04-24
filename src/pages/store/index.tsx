import { StyledDappStore } from './Store.styled';
import { CDN_URL } from '@/configs';
import Text from '@/components/Text';
import IconSVG from '@/components/IconSVG';

const DAPPS_LIST = [
  {
    image: `${CDN_URL}/images/wallet-logo.svg`,
    name: 'Trustless Wallet',
    creator: 'dev.tc',
    desc: 'A crypto wallet & gateway to decentralized applications on Bitcoin.',
    link: 'https://trustlesswallet.io/',
  },
  {
    image: `${CDN_URL}/icons/logo-generative-dark.svg`,
    name: 'Generative',
    creator: 'generative.tc',
    // creatorAvatar: `${CDN_URL}/icons/avatar-generative.svg`,
    desc: 'An open platform for creating & collecting art on Bitcoin.',
    link: 'https://generative.xyz/',
  },
  {
    image: `${CDN_URL}/icons/logo-tc-nft.svg`,
    name: 'Trustless NFTs',
    creator: '3700.tc',
    desc: 'Issue your BRC-721 NFTs on Bitcoin for collectible items, memberships, in-game items, and more.',
    link: `https://trustlessnfts.com/`,
  },

  {
    image: `${CDN_URL}/icons/logo-tc-artifact.svg`,
    name: 'Bitcoin Artifacts',
    creator: '368.tc',
    desc: 'Preserve files on Bitcoin forever. Cheap. Immutable. Fully on-chain.',
    link: `https://trustlessartifacts.com/`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-market.svg`,
    name: 'Trustless Market',
    creator: '686.tc',
    desc: 'Issue your BRC-20 tokens on Bitcoin for virtually anything: a cryptocurrency, a share in a company, voting rights in a DAO, and more.',
    link: `https://trustless.market/`,
  },
  {
    image: `${CDN_URL}/icons/logo-tc-name.svg`,
    name: 'Trustless Domain',
    creator: '286.tc',
    desc: 'Use your BNS (Bitcoin Name System) name to receive any token and NFT. No more copying and pasting long addresses.',
    link: `https://trustless.domains/`,
  },
  {
    image: `${CDN_URL}/icons/logo-remix.svg`,
    name: 'Trustless IDE',
    creator: 'ape.tc',
    desc: 'Trustless IDE contracts on Trustless Computer. Simple. Quick. No additional technical requirements.',
    link: 'https://trustlesside.com/',
  },
  {
    image: `${CDN_URL}/images/logo_faucet.svg`,
    name: 'Trustless Faucet',
    creator: 'dev.tc',
    desc: 'Claim TC to cover network fees when executing transactions on Trustless Computer.',
    link: 'https://trustlessfaucet.io/',
  },
  {
    image: `${CDN_URL}/icons/logo-photos.svg`,
    name: 'Bitcoin Photos',
    creator: 'robot.tc',
    // creatorAvatar: `${CDN_URL}/icons/avatar-robot.svg`,
    desc: 'Coming soon',
    link: '',
  },
];

const DappsStorePage = () => {
  return (
    <StyledDappStore>
      <h2 className="font-ibm">
        The dapps you love.
        <br />
        Now on Bitcoin.
      </h2>
      <div className="app-list">
        {DAPPS_LIST.map((item, index) => (
          <a
            key={`app-${index}`}
            href={item.link}
            className={`app-item ${!item.link ? 'app-disabled' : ''} `}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="app-item__image">
              {/* <img src={item.image} alt={`${item.name} logo`} /> */}
              <IconSVG src="" url={item.image} maxWidth="80" />
            </div>
            <div className="app-item__content">
              <p className="app-name">{item.name}</p>

              <div className="creator">
                {/* <img src={item.creatorAvatar} width="24" height="24" /> */}
                <p className="app-creator">by {item.creator}</p>
              </div>
              <Text size="medium" className="app-desc">
                {item.desc}
              </Text>
            </div>
          </a>
        ))}
      </div>
    </StyledDappStore>
  );
};

export default DappsStorePage;
