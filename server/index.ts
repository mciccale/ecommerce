import app from './app';
import { config, logger } from './utils';

const PORT = config.PORT || 3000;
app.listen(PORT, (): void => {
  logger.info(`Server listening at port ${PORT}`);
});
