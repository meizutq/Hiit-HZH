import { Exercise } from '../types';

export const HIIT_EXERCISES: Exercise[] = [
  {
    id: 'jumping-jacks',
    name: 'Bật nhảy (Jumping Jacks)',
    description: '1. Đứng thẳng, hai chân khép. \n2. Bật nhảy dang rộng hai chân đồng thời đưa hai tay lên cao qua đầu. \n3. Tiếp đất nhẹ nhàng và bật nhảy trở về tư thế ban đầu.',
    breathing: 'Hít vào bằng mũi khi bật nhảy rộng, thở ra mạnh bằng miệng khi khép chân.',
    image: '/exercises/jumping-jacks.gif',
    muscleGroup: 'Toàn thân'
  },
  {
    id: 'mountain-climbers',
    name: 'Leo núi tại chỗ (Mountain Climbers)',
    description: '1. Bắt đầu ở tư thế plank cao. \n2. Co từng đầu gối về phía ngực luân phiên nhanh nhất có thể. \n3. Giữ lưng thẳng và mông không đưa lên quá cao.',
    breathing: 'Hít thở đều đặn, nhịp thở ngắn và nhanh theo từng nhịp bước chân.',
    image: '/exercises/mountain-climbers.gif',
    muscleGroup: 'Toàn thân'
  },
  {
    id: 'burpees',
    name: 'Burpees (Nhảy ếch)',
    description: '1. Đứng thẳng, hạ người chống tay. \n2. Bật chân ra sau thành plank. \n3. Bật chân về trước và bật nhảy cao.',
    breathing: 'Hít vào khi hạ người, thở ra mạnh mẽ khi bật nhảy lên cao.',
    image: '/exercises/burpees.gif',
    muscleGroup: 'Toàn thân'
  },
  {
    id: 'plank',
    name: 'Đo sàn (Plank)',
    description: '1. Chống khuỷu tay xuống sàn, vuông góc với vai. \n2. Giữ cơ thể thành đường thẳng từ đầu đến gót chân. \n3. Siết chặt cơ bụng.',
    breathing: 'Hít thở sâu, chậm và đều đặn qua mũi.',
    image: '/exercises/plank.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'squats',
    name: 'Squat (Ngồi xổm)',
    description: '1. Đứng thẳng, chân rộng bằng vai. \n2. Hạ hông xuống như đang ngồi ghế. \n3. Giữ lưng thẳng, gối không vượt mũi chân.',
    breathing: 'Hít vào khi hạ thấp, thở ra khi đứng lên.',
    image: '/exercises/squats.gif',
    muscleGroup: 'Chân & Mông'
  },
  {
    id: 'push-ups',
    name: 'Hít đất (Push-ups)',
    description: '1. Hai tay chống sàn rộng hơn vai. \n2. Hạ người thẳng cho đến khi ngực gần chạm sàn. \n3. Đẩy người về vị trí cũ.',
    breathing: 'Hít vào khi hạ thấp, thở ra khi đẩy người lên.',
    image: '/exercises/push-ups.gif',
    muscleGroup: 'Tay & Vai'
  },
  {
    id: 'bicycle-crunches',
    name: 'Gập bụng đạp xe',
    description: '1. Nằm ngửa, tay sau đầu. \n2. Co gối chạm khuỷu tay đối diện. \n3. Luân phiên như đạp xe.',
    breathing: 'Thở ra khi xoay người, hít vào khi đổi bên.',
    image: '/exercises/bicycle-crunches.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'lunges',
    name: 'Chùng chân (Lunges)',
    description: '1. Bước một chân lên trước. \n2. Hạ hông cho đến khi hai gối tạo góc 90 độ. \n3. Rút chân về và đổi bên.',
    breathing: 'Hít vào khi hạ thấp, thở ra khi đẩy về.',
    image: '/exercises/lunges.gif',
    muscleGroup: 'Chân & Mông'
  },
  {
    id: 'leg-raises',
    name: 'Nâng chân (Leg Raises)',
    description: '1. Nằm ngửa, chân duỗi. \n2. Nâng cả hai chân lên cao vuông góc sàn. \n3. Hạ chậm nhưng không chạm sàn.',
    breathing: 'Hít vào khi hạ chân, thở ra khi nâng lên.',
    image: '/exercises/leg-raises.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'abdominal-crunches',
    name: 'Tập cơ bụng (Crunches)',
    description: '1. Nằm ngửa, gối co. \n2. Nâng vai khỏi sàn, siết bụng. \n3. Hạ người về vị trí cũ.',
    breathing: 'Thở ra khi nâng người, hít vào khi hạ xuống.',
    image: '/exercises/abdominal-crunches.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'russian-twists',
    name: 'Gập bụng chéo kiểu Nga',
    description: '1. Ngồi trên sàn, chân hơi nâng. \n2. Xoay thân người sang trái rồi sang phải. \n3. Giữ bụng siết chặt.',
    breathing: 'Thở ra đều đặn khi xoay người hai bên.',
    image: '/exercises/russian-twists.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'heel-touches',
    name: 'Chạm gót chân',
    description: '1. Nằm ngửa, gối co, chân đặt trên sàn. \n2. Nghiêng người chạm tay vào gót chân luân phiên hai bên. \n3. Siết cơ bụng liên tục.',
    breathing: 'Thở ra khi chạm gót, hít vào khi về giữa.',
    image: '/exercises/heel-touches.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'cobra-stretch',
    name: 'Duỗi người kiểu hổ mang',
    description: '1. Nằm sấp, hai bàn tay chống sàn cạnh ngực. \n2. Đẩy thẳng tay, ngửa cổ và ưỡn ngực lên trên. \n3. Giữ tư thế để giãn cơ bụng.',
    breathing: 'Hít sâu và thở ra chậm dãi để thư giãn cơ thể.',
    image: '/exercises/cobra-stretch.gif',
    muscleGroup: 'Giãn cơ'
  },
  {
    id: 'spinal-twist-left',
    name: 'Duỗi vặn sống lưng bên trái',
    description: '1. Nằm ngửa, co gối trái và đưa sang bên phải. \n2. Tay trái dang rộng, mắt nhìn theo hướng tay trái. \n3. Giữ để giãn cột sống.',
    breathing: 'Hít thở sâu và đều đặn qua tư thế vặn.',
    image: '/exercises/spinal-twist-left.gif',
    muscleGroup: 'Giãn cơ'
  },
  {
    id: 'spinal-twist-right',
    name: 'Duỗi vặn sống lưng bên phải',
    description: '1. Nằm ngửa, co gối phải và đưa sang bên trái. \n2. Tay phải dang rộng, mắt nhìn theo hướng tay phải. \n3. Giữ để giãn cột sống.',
    breathing: 'Hít thở sâu và đều đặn qua tư thế vặn.',
    image: '/exercises/spinal-twist-right.gif',
    muscleGroup: 'Giãn cơ'
  },
  {
    id: 'high-knees',
    name: 'Chạy nâng cao đùi',
    description: '1. Chạy tại chỗ, nâng cao gối lên ngang hông. \n2. Đánh tay nhịp nhàng theo bước chân. \n3. Giữ lưng thẳng.',
    breathing: 'Hít thở ngắn và nhanh theo nhịp chân.',
    image: '/exercises/high-knees.gif',
    muscleGroup: 'Toàn thân'
  },
  {
    id: 'glute-bridge',
    name: 'Nâng hông (Glute Bridge)',
    description: '1. Nằm ngửa, gối co, chân đặt trên sàn. \n2. Nâng hông lên cao cho đến khi đùi và thân người thành đường thẳng. \n3. Siết chặt mông.',
    breathing: 'Thở ra khi nâng hông, hít vào khi hạ xuống.',
    image: '/exercises/glute-bridge.gif',
    muscleGroup: 'Chân & Mông'
  },
  {
    id: 'tricep-dips',
    name: 'Chống đẩy sau (Tricep Dips)',
    description: '1. Chống tay lên ghế hoặc bục, chân duỗi phía trước. \n2. Hạ người xuống bằng cách gập khuỷu tay. \n3. Đẩy người lên lại.',
    breathing: 'Hít vào khi hạ xuống, thở ra khi đẩy lên.',
    image: '/exercises/tricep-dips.gif',
    muscleGroup: 'Tay & Vai'
  },
  {
    id: 'side-plank-left',
    name: 'Plank nghiêng bên trái',
    description: '1. Nằm nghiêng bên trái, chống khuỷu tay trái. \n2. Nâng hông lên tạo thành đường thẳng. \n3. Giữ tư thế.',
    breathing: 'Hít thở đều đặn và sâu.',
    image: '/exercises/side-plank-left.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'side-plank-right',
    name: 'Plank nghiêng bên phải',
    description: '1. Nằm nghiêng bên phải, chống khuỷu tay phải. \n2. Nâng hông lên tạo thành đường thẳng. \n3. Giữ tư thế.',
    breathing: 'Hít thở đều đặn và sâu.',
    image: '/exercises/side-plank-right.gif',
    muscleGroup: 'Cơ bụng'
  },
  {
    id: 'bird-dog',
    name: 'Tư thế Bird Dog',
    description: '1. Chống hai tay và đầu gối xuống sàn. \n2. Nâng tay trái và chân phải cùng lúc. \n3. Luân phiên đổi bên.',
    breathing: 'Thở ra khi vươn tay chân, hít vào khi thu về.',
    image: '/exercises/bird-dog.gif',
    muscleGroup: 'Toàn thân'
  }
];

export const WORKOUT_ROUTINES = [
  {
    id: 'beginner-workout',
    name: 'Bài Tập Cho Người Mới Bắt Đầu',
    description: 'Chuỗi bài tập cơ bản giúp làm quen với nhịp độ tập luyện HIIT.',
    exercises: [
      'jumping-jacks', 'abdominal-crunches', 'russian-twists', 'mountain-climbers', 
      'heel-touches', 'leg-raises', 'plank', 'abdominal-crunches', 
      'russian-twists', 'mountain-climbers', 'heel-touches', 'leg-raises', 
      'plank', 'cobra-stretch', 'spinal-twist-left', 'spinal-twist-right'
    ],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'hiit-express-5m',
    name: 'Đốt Mỡ Cấp Tốc (5 Phút)',
    description: '8 bài tập cường độ cao xen kẽ, hoàn hảo cho buổi sáng bận rộn.',
    exercises: ['jumping-jacks', 'mountain-climbers', 'squats', 'push-ups', 'bicycle-crunches', 'lunges', 'plank', 'burpees'],
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'warrior-7m',
    name: 'Chiến Binh Thép (7 Phút)',
    description: 'Tăng cường sức bền và tim mạch với 11 bài tập liên hoàn.',
    exercises: ['jumping-jacks', 'mountain-climbers', 'burpees', 'squats', 'push-ups', 'lunges', 'bicycle-crunches', 'plank', 'jumping-jacks', 'mountain-climbers', 'burpees'],
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'ultimate-10m',
    name: 'Siêu Cấp 10 Phút',
    description: 'Thử thách cực đại với 15 bài tập, đốt cháy tối đa năng lượng dư thừa.',
    exercises: ['jumping-jacks', 'mountain-climbers', 'burpees', 'squats', 'push-ups', 'lunges', 'bicycle-crunches', 'plank', 'jumping-jacks', 'mountain-climbers', 'burpees', 'squats', 'push-ups', 'lunges', 'bicycle-crunches'],
    color: 'from-purple-600 to-pink-700'
  }
];
