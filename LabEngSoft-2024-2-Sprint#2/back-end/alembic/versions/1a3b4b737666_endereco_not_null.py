"""endereco not null

Revision ID: 1a3b4b737666
Revises: cc9dd19f2bc6
Create Date: 2024-09-14 18:14:26.803570

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1a3b4b737666'
down_revision: Union[str, None] = 'cc9dd19f2bc6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('denuncia', 'endereco',
               existing_type=sa.VARCHAR(length=200),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('denuncia', 'endereco',
               existing_type=sa.VARCHAR(length=200),
               nullable=True)
    # ### end Alembic commands ###