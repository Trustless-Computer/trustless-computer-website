import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const StyledModalUpload = styled(Modal)`
  &.modal {
    --bs-modal-color: ${({ theme }) => theme.bg1};
  }

  .modal-content {
    border-radius: 2px;
  }

  .modal-header {
    border-bottom: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    padding-top: ${px2rem(18)};
    padding-right: ${px2rem(18)};
  }

  .modal-body {
    padding-top: ${px2rem(7)};
  }

  .modal-footer {
    border-top: none;
  }

  /* ======= Custom modal ========== */

  .dropZone {
    margin-top: ${px2rem(24)};

    width: 100%;
  }

  .preview-wrapper {
    img {
      background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
      max-height: ${px2rem(281)};
      width: 100%;
      object-fit: contain;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: ${px2rem(12)};
      cursor: pointer;
    }
  }

  .error-text {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }
  .file-upload-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .upload-fee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${px2rem(16)};

    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text7};
    }
  }
`;
