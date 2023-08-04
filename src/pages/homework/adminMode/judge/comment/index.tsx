import React, { HTMLAttributes } from 'react';
import { List, Card, Avatar } from 'antd';
import './index.less';
import Title from '../../../../../components/pages/title';
const { Meta } = Card;
interface CommentProps {
  scrollStatus?: boolean;
}
const Comment: React.FC<HTMLAttributes<HTMLDivElement> & CommentProps> = (props) => {
  const { scrollStatus, ...restProps } = props;
  console.log(scrollStatus);
  // const [loading, setLoading] = useState(true);
  const data = [{ title: '123123' }, { title: 234278394 }];
  // const onChange = (checked: boolean) => {
  //   setLoading(!checked);
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(!loading);
  //   }, 1000);
  // }, []);
  return (
    <div {...restProps}>
      <Card
        className="comment-card"
        title={
          <Title title="评论区" style={{ marginLeft: '0' }}>
            评论区
          </Title>
        }
      >
        <List
          dataSource={data}
          className="comment-wrap"
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '80%', margin: 'auto' }} loading={true}>
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                  }
                  title={item.title}
                  description="This is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the description"
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Comment;
