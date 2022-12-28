import ModalSkeleton from "./ModalSkeleton";
import WalletSecrets from "./WalletSecrets";

export default function WalletModal({ fontSize, iconSize, topBarViewHeight, accountHelper }) {
    const content = () => (<> 
        <WalletSecrets fontSize={fontSize} iconSize={iconSize} accountHelper={accountHelper}/>
    </>);
 
  return (
      <>
        <ModalSkeleton
            content={content}
            topBarViewHeight={topBarViewHeight}
        />
      </>
    );
}

