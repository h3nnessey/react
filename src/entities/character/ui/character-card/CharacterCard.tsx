import { PureComponent } from 'react';

interface CharacterCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export class CharacterCard extends PureComponent<CharacterCardProps> {
  render() {
    const { imageUrl, title, description } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          gap: '10px',
          borderRadius: '10px',
          border: '1px solid black',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          width={50}
          height={50}
          style={{
            borderRadius: '10px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <p>{title}</p>
          <p style={{ alignSelf: 'flex-end', paddingRight: '10px' }}>
            {description}
          </p>
        </div>
      </div>
    );
  }
}
