import { useGameStore }       from '../../store/gameStore';
import AnimatedBackground    from '../background/AnimatedBackground';
import LeftSidebar           from './LeftSidebar';
import RightSidebar          from './RightSidebar';
import TopBar                from './TopBar';
import FloatingControls      from './FloatingControls';
import SubjectScreen         from '../screens/SubjectScreen';
import DifficultyScreen      from '../screens/DifficultyScreen';
import StageMapScreen        from '../screens/StageMapScreen';
import StageDetailScreen     from '../screens/StageDetailScreen';
import LessonScreen          from '../screens/LessonScreen';
import CompleteScreen        from '../screens/CompleteScreen';

export default function AppShell() {
  const { screen } = useGameStore();
  const SCREENS = {
    subject:'', difficulty:'', stageMap:'', stageDetail:'', lesson:'', complete:'',
  };
  const isLesson = screen === 'lesson';
  const render = {
    subject:     <SubjectScreen />,
    difficulty:  <DifficultyScreen />,
    stageMap:    <StageMapScreen />,
    stageDetail: <StageDetailScreen />,
    lesson:      <LessonScreen />,
    complete:    <CompleteScreen />,
  }[screen] ?? <SubjectScreen />;

  return (
    <>
      <AnimatedBackground />
      <FloatingControls />
      <TopBar />
      <div className={`flex min-h-screen ${isLesson?'':'max-w-[1280px] mx-auto px-4'}`}>
        {!isLesson && <LeftSidebar />}
        <main className="flex-1 min-w-0 py-4">{render}</main>
        {!isLesson && <RightSidebar />}
      </div>
    </>
  );
}
