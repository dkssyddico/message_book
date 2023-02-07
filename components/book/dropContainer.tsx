import { Drop } from '@prisma/client';
import Container from './container';
import InfoBox from './infoBox';

interface DropContainerProps {
  drop: Drop | undefined;
}

export default function DropContainer({ drop }: DropContainerProps) {
  return (
    <Container title='드랍 정보'>
      <div className='flex flex-col items-center space-y-4'>
        <InfoBox title='은행' answer={drop?.bank} />
        <InfoBox title='예금주' answer={drop?.accountOwner} />
        <InfoBox title='계좌 번호' answer={drop?.account} />
        <InfoBox title='최소 금액' answer={drop?.minAmount} />
        <InfoBox
          title='입금 기한'
          answer={drop?.endDate.toString().slice(0, 10)}
        />
      </div>
    </Container>
  );
}
